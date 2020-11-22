import React from "react"

import Navbar from "../components/navbar"
import SEO from "../components/seo"
import Footer from "../components/footer"
import TabAbout from "../components/tabAbout"
import Layout from "../components/layout"

import { ABOUT } from "../utils/constants"

const AboutPage = () => {
  return (
    <Layout>
      <SEO title={ABOUT} path={`/${ABOUT}`} />
      <Navbar tab={ABOUT} />
      <TabAbout />
      <Footer />
    </Layout>
  )
}

export default AboutPage
