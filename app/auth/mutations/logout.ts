import db from "db"
import { Ctx } from "blitz"
import { revokeToken } from "twitch-auth"
import { assert } from "utils"

assert(process.env.TWITCH_CLIENT_ID, "You must provide the TWITCH_CLIENT_ID env variable")

const logoutMutation = async (input: undefined, ctx: Ctx) => {
  const user = await db.botAuth.delete({
    where: {
      id: 1,
    },
    select: {
      token: true,
    },
  })

  if (user?.token) await revokeToken(process.env.TWITCH_CLIENT_ID as string, user.token)
  if (ctx.session.userId) await ctx.session.$revoke()
}

export default logoutMutation
