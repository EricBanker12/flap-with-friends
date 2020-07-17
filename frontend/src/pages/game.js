import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Game from "../components/game"

const GamePage = () => {

  return (
    <Layout>
      <SEO title="Game" />
      <section style={{display: "flex", justifyContent: "center", userSelect: "none"}}>
        <Game />
      </section>
    </Layout>
  )
}

export default GamePage
