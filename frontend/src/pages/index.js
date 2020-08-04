import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TabAbout from "../components/tabAbout"
import TabSetup from "../components/tabSetup"
import TabChat from "../components/tabChat"
import SideSection from "../components/sideSection"
import TabGame from "../components/tabGame"
import Navbar from "../components/navbar"

import { MOBILE, SETUP, ABOUT, CHAT, GAME } from "../utils/constants"

const IndexPage = () => {

  return (
    <Layout>
      <SEO title="Home" />
      <div className="row m-0">
        <Navbar />
        <section className="col-md-6 col-sm-12 p-0">
          <div className="mx-4">
            <TabSetup tab={SETUP} />
            <TabGame tab={GAME} />
            <TabAbout tab={ABOUT} />
            <TabChat tab={CHAT} device={MOBILE} />
          </div>
        </section>
        <SideSection />
      </div>
    </Layout>
  )
}

export default IndexPage
