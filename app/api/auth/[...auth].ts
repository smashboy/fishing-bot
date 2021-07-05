import {
  passportAuth,
  VerifyCallbackResult,
  AuthenticationError,
  Ctx,
  BlitzPassportStrategy,
} from "blitz"
import db from "db"
import { Strategy as TwitchStrategy } from "passport-twitch-latest"
import { twitchAuthProvider } from "integrations/twitch"
import { assert } from "utils"
import { twitchBotAuthConfig } from "integrations/configs"

assert(process.env.TWITCH_CLIENT_ID, "You must provide the TWITCH_CLIENT_ID env variable")
assert(process.env.TWITCH_CLIENT_SECRET, "You must provide the TWITCH_CLIENT_SECRET env variable")

const twitchAuth = (ctx: Ctx): BlitzPassportStrategy => ({
  authenticateOptions: {
    scope: twitchBotAuthConfig.scope,
  },
  strategy: new TwitchStrategy(
    {
      clientID: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
      callbackURL: twitchBotAuthConfig.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      done()
    }
  ),
})
