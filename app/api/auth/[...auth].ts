import {
  passportAuth,
  AuthenticationError,
  BlitzPassportStrategy,
  Ctx,
  VerifyCallbackResult,
} from "blitz"
import { Strategy as TwitchStrategy } from "passport-twitch-latest"
import { twitchAuthProvider } from "integrations/twitch"
import { assert } from "utils"
import { twitchBotAuthConfig } from "integrations/configs"

assert(process.env.TWITCH_CLIENT_ID, "You must provide the TWITCH_CLIENT_ID env variable")
assert(process.env.TWITCH_CLIENT_SECRET, "You must provide the TWITCH_CLIENT_SECRET env variable")
assert(process.env.WHITE_LIST_TWITCH_UID, "You must provide the WHITE_LIST_TWITCH_UID env variable")

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
      if (profile.id !== process.env.WHITE_LIST_TWITCH_UID) return done(new AuthenticationError())

      const provider = twitchAuthProvider({
        accessToken,
        refreshToken,
      })

      await provider.refresh()

      const result: VerifyCallbackResult = {
        publicData: {
          userId: 1,
        },
        redirectUrl: "/",
      }

      done(null, result)
    }
  ),
})

export default passportAuth((ctx) => ({
  successRedirectUrl: "/",
  strategies: [twitchAuth(ctx)],
}))
