import db from "db"
import { Server as IHttpServer } from "http"
import { Server } from "socket.io"
import { log } from "@blitzjs/display"
import { twitchAuthProvider } from "integrations/twitch"
import { Bot as TwitchBot } from "easy-twitch-bot"
import { botConfig, botSocketsConfig, RoomKeyType } from "./botConfigs"
import { smallFish, mediumFish, largeFish } from "./commands"

export default class Bot {
  private io: Server
  private bot: TwitchBot
  private botConnectionInterval: NodeJS.Timer | null = null
  private readonly botConnectionIntervalTime = 1000 * 10

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
              id: 1,
            },
            select: {
              token: true,
              refreshToken: true,
              expiresAt: true,
            },
          })

          if (!botAuth) return log.warning("User is not authenticated")

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
              smallFish((roomKey, newAmount) => this.updateWidget(roomKey, newAmount)),
              mediumFish((roomKey, newAmount) => this.updateWidget(roomKey, newAmount)),
              largeFish((roomKey, newAmount) => this.updateWidget(roomKey, newAmount)),
            ],
          })

          log.success("Bot is running...")

          this.initSockets()

          resolve(true)
        } catch (error) {
          reject(error)
        }
      }, this.botConnectionIntervalTime)
    })
  }

  private initSockets() {
    this.io.on("connection", (socket) => {
      log.info(`SOCKET CONNECTED: ${socket.id} : ${this.io.sockets.sockets.size}`)

      socket.on(botSocketsConfig.socketEvents.JOIN_SMALL_ROOM, () =>
        socket.join(botSocketsConfig.roomKeys.smallFish)
      )
      socket.on(botSocketsConfig.socketEvents.JOIN_MEDIUM_ROOM, () =>
        socket.join(botSocketsConfig.roomKeys.mediumFish)
      )
      socket.on(botSocketsConfig.socketEvents.JOIN_LARGE_ROOM, () =>
        socket.join(botSocketsConfig.roomKeys.largeFish)
      )

      socket.on("disconnect", (reason) => log.info(`SOCKET DISCONNECTED: ${socket.id} : ${reason}`))
    })
  }

  private updateWidget(roomKey: RoomKeyType, newAmount: number) {
    log.info(`UPDATE WIDGET: ${roomKey}/${newAmount}`)
    this.io.sockets.to(roomKey).emit(botSocketsConfig.socketEvents.UPDATE_WIDGET, newAmount)
  }
}
