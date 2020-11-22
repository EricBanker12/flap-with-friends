import React from "react"

import Navbar from "../components/navbar"
import SEO from "../components/seo"
import Footer from "../components/footer"
import Layout from "../components/layout"
import TabJoin from "../components/tabJoin"

import { JOIN } from "../utils/constants"

const AboutPage = () => {
  return (
    <Layout>
      <SEO title={JOIN} path={`/${JOIN}`} />
      <Navbar tab={JOIN} />
      <TabJoin />
      <Footer />
    </Layout>
  )
}

export default AboutPage
