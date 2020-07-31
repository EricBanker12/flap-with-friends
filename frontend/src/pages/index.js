import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TabAbout from "../components/tabAbout"
import TabSetup from "../components/tabSetup"
import TabChat from "../components/tabChat"
import Tabs from "../components/tabs"
import SideSection from "../components/sideSection"

import { MOBILE, SETUP, ABOUT, CHAT } from "../utils/constants"

const IndexPage = () => {

  return (
    <Layout>
      <SEO title="Home" />
      <div className="row m-0">
        <section className="col-sm-6 col-xs-12 p-0">
          <Tabs />
          <div className="mx-4">
            <TabSetup tab={SETUP} />
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
