import db from "db"
import { Server as IHttpServer } from "http"
import { Server } from "socket.io"
import { log } from "@blitzjs/display"
import { twitchAuthProvider } from "integrations/twitch"
import { Bot as TwitchBot } from "easy-twitch-bot"
import { botConfig, RoomKeyType } from "./botConfig"
import { smallFish, mediumFish, largeFish } from "./commands"

export default class Bot {
  private io: Server
  private bot: TwitchBot
  private botConnectionInterval: NodeJS.Timer | null = null
  private readonly botConnectionIntervalTime = 1000 * 60

  constructor(server: IHttpServer) {
    this.io = new Server(server)

    this.init().catch((error) => console.error(error))
  }

  private init() {
    return new Promise((resolve, reject) => {
      this.botConnectionInterval = setInterval(async () => {
        try {
          log.info("Trying to authenticate bot...")

          const botAuth = await db.botAuth.findUnique({
            where: {
              id: 0,
            },
            select: {
              token: true,
              refreshToken: true,
              expiresAt: true,
            },
          })

          if (!botAuth) return

          log.success("Bot authentication exists...")

          clearInterval(this.botConnectionInterval!)
          this.botConnectionInterval = null

          const twitchAuth = twitchAuthProvider({
            accessToken: botAuth.token,
            refreshToken: botAuth.refreshToken,
            expiresAt: botAuth.expiresAt,
          })

          this.bot = await TwitchBot.create({
            auth: twitchAuth,
            channels: botConfig.channels,
            prefix: botConfig.prefix,
            commands: [
              smallFish((roomKey, newNumber) => this.updateWidget(roomKey, newNumber)),
              mediumFish((roomKey, newNumber) => this.updateWidget(roomKey, newNumber)),
              largeFish((roomKey, newNumber) => this.updateWidget(roomKey, newNumber)),
            ],
          })

          log.success("Bot is running...")

          resolve(true)
        } catch (error) {
          reject(error)
        }
      }, this.botConnectionIntervalTime)
    })
  }

  private updateWidget(roomKey: RoomKeyType, newNumber: number) {
    this.io.sockets.to(roomKey).emit(botConfig.socketEvents.UPDATE_WIDGET, newNumber)
  }
}