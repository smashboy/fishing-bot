import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

const WidgetLinkSelector: React.FC<{ link: string }> = ({ link }) => {
  return (
    <div className="py-2 px-4 bg-gray-300 text-gray-900 font-bold rounded-xl text-center">
      {link}
    </div>
  )
}

const Home: BlitzPage = () => {
  const links = [
    `${window.location.origin}/small-fish`,
    `${window.location.origin}/medium-fish`,
    `${window.location.origin}/large-fish`,
  ]

  return (
    <div className="flex justify-center w-full h-screen items-center">
      <div className="grid gap-2">
        {links.map((link) => (
          <WidgetLinkSelector key={link} link={link} />
        ))}
      </div>
    </div>
  )
}

Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
