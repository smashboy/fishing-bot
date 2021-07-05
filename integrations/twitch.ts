import db from "db"
import { RefreshableAuthProvider, StaticAuthProvider, revokeToken } from "twitch-auth"
import { assert } from "utils"
import { log } from "@blitzjs/display"
import { twitchBotAuthConfig } from "./configs"
import { TwitchAuthProviderType } from "./types"

assert(process.env.TWITCH_CLIENT_ID, "You must provide the TWITCH_CLIENT_ID env variable")
assert(process.env.TWITCH_CLIENT_SECRET, "You must provide the TWITCH_CLIENT_SECRET env variable")

export const twitchAuthProvider = ({
  accessToken,
  refreshToken,
  expiresAt,
}: TwitchAuthProviderType) => {
  return new RefreshableAuthProvider(
    new StaticAuthProvider(
      process.env.TWITCH_CLIENT_ID as string,
      accessToken,
      twitchBotAuthConfig.scope.split(" ")
    ),
    {
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
      refreshToken,
      expiry: expiresAt || null,
      onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
        log.info(`New bot auth token: ${expiryDate?.getDate() || "none"}`)

        await db.botAuth.upsert({
          where: {
            id: 0,
          },
          create: {
            token: accessToken,
            refreshToken,
            expiresAt: expiryDate,
          },
          update: {
            token: accessToken,
            refreshToken,
            expiresAt: expiryDate,
          },
        })
      },
    }
  )
}

export const revokeTwitchAuthToken = (token: string) =>
  revokeToken(process.env.TWITCH_CLIENT_ID as string, token)
