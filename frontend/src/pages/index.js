import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tab from "../components/tab"
import TabAbout from "../components/tabAbout"
import TabSetup from "../components/tabSetup"
import TabChat from "../components/tabChat"
import Tabs from "../components/tabs"

const IndexPage = () => {

  return (
    <Layout>
      <SEO title="Home" />
      <div className="row m-0">
        <section className="col-sm-6 col-xs-12 p-0">
          <Tabs />
          <div className="mx-4">
            <TabSetup />
            <TabAbout />
            <TabChat />
          </div>
        </section>
        <section className="col-sm-6 px-0">
          <ul className="nav nav-tabs">
            <Tab text="Chat" active={true} />
          </ul>
          <div className="mx-4">
            <TabChat hidden={false} />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default IndexPage
