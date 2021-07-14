import { BlitzPage, Link, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense } from "react"
// import logout from "app/auth/mutations/logout"

const WidgetLinkSelector: React.FC<{ link: string }> = ({ link }) => {
  return (
    <div className="py-2 px-4 bg-gray-300 text-gray-900 font-bold rounded-xl text-center">
      {link}
    </div>
  )
}

const AuthButton = () => {
  const session = useSession()

  // const [logoutMutation] = useMutation(logout)

  return (
    <div className="flex justify-center">
      {session.userId ? //   ВЫЙТИ // > //   className="px-4 py-2 bg-purple-800 text-white rounded-md" //   onClick={() => logoutMutation()} // <button
      // </button>
      null : (
        <Link href="/api/auth/twitch" passHref>
          <a className="px-4 py-2 bg-purple-800 text-white rounded-md">АВТОРИЗАЦИЯ</a>
        </Link>
      )}
    </div>
  )
}

const Home: BlitzPage = () => {
  const links = [
    `${window.location.origin}/small-fish`,
    `${window.location.origin}/medium-fish`,
    `${window.location.origin}/large-fish`,
    `${window.location.origin}/icon`,
  ]

  return (
    <div className="flex flex-wrap justify-center w-full h-screen items-center">
      <div className="grid gap-2">
        <Suspense fallback={"Loading authenticaiton..."}>
          <AuthButton />
        </Suspense>
        {links.map((link) => (
          <WidgetLinkSelector key={link} link={link} />
        ))}
      </div>
    </div>
  )
}

Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
