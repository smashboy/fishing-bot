import { assert } from "utils"

assert(process.env.APP_ORIGIN, "You must provide the APP_ORIGIN env variable")

export const twitchBotAuthConfig = {
  callbackURL: `${process.env.APP_ORIGIN}/api/auth/twitch/callback`,
  scope: "chat:edit chat:read",
}
