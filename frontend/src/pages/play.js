import React from "react"
import loadable from "@loadable/component"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Game = loadable(() => import("../components/game"))

const PlayPage = () => {

  return (
    <Layout>
      <Helmet>
        <style type="text/css">
          {`
            @media (max-width: 576px) {
                header {
                  display: none !important;
                }
            }
          `}
        </style>
      </Helmet>
      <SEO title="Play" path="/play" />
      <section style={{display: "flex", justifyContent: "center", userSelect: "none"}}>
        <Game />
      </section>
    </Layout>
  )
}

export default PlayPage
