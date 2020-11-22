import React from "react"

import Navbar from "../components/navbar"
import SEO from "../components/seo"
import Footer from "../components/footer"
import TabSetup from "../components/tabSetup"
import Layout from "../components/layout"

import { START } from "../utils/constants"

const StartPage = () => {
  return (
    <Layout>
      <SEO title={START} />
      <Navbar tab={START} />
      <TabSetup />
      <Footer />
    </Layout>
  )
}

export default StartPage
