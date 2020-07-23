import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GameSetup from "../components/gameSetup"

const SETUP = "setup"
const ABOUT = "about"

const IndexPage = () => {
  const [currentTab, setCurrentTab] = useState(SETUP)

  return (
    <Layout>
      <SEO title="Home" />
      <section>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <div
              className={`nav-link ${currentTab === SETUP ? "active" : ""}`}
              style={{cursor: "pointer"}}
              onClick={() => {setCurrentTab(SETUP)}}>
              <h1>Setup</h1>
            </div>
          </li>
          <li className="nav-item">
            <div
              className={`nav-link ${currentTab === ABOUT ? "active" : ""}`}
              style={{cursor: "pointer"}}
              onClick={() => {setCurrentTab(ABOUT)}}>
              <h1>About</h1>
            </div>
          </li>
        </ul>
        <div className="tab-content">
          <div className={`tab-pane fade ${currentTab === SETUP ? "active show" : ""}`}>
            <GameSetup/>
          </div>
          <div className={`tab-pane fade ${currentTab === ABOUT ? "active show" : ""}`}>
            <p className="mx-4">This is a remake of Dong Nguyen's Flappy Bird video game with added multiplayer to compete with friends.</p>
          
            <h2 className="mx-4">How to Play</h2>
            <ul className="mx-4">
              <li>Tap the screen or hit spacebar to flap upwards.</li>
              <li>Wait for gravity to fall downwards.</li>
              <li>Avoid obstacles and stay in flight the longest to win!</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
