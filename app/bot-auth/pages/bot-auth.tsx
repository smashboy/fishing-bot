import { BlitzPage, Link } from "blitz"
import Layout from "app/core/layouts/Layout"

const BotAuth: BlitzPage = () => {
  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Link href="/api/auth/twitch" passHref>
        <a className="px-4 py-2 bg-purple-800 text-white rounded-md">AUTHENTICATE</a>
      </Link>
    </div>
  )
}

BotAuth.getLayout = (page) => <Layout>{page}</Layout>

export default BotAuth
