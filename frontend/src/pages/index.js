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
      <div className="row m-0">
        <section className="col-sm-6 col-xs-12 p-0">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`bg-white nav-link ${currentTab === SETUP ? "active" : ""}`}
                role="tab"
                onClick={() => {setCurrentTab(SETUP)}}>
                <h1>Setup</h1>
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`bg-white nav-link ${currentTab === ABOUT ? "active" : ""}`}
                role="tab"
                onClick={() => {setCurrentTab(ABOUT)}}>
                <h1>About</h1>
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`bg-white nav-link ${currentTab === "CHAT" ? "active" : ""}`}
                role="tab"
                onClick={() => {setCurrentTab("CHAT")}}>
                <h1>Chat</h1>
              </button>
            </li>
          </ul>
          <div className="tab-content mx-4">
            <div role="tabpanel" className={`tab-pane fade ${currentTab === SETUP ? "active show" : ""}`}>
              <GameSetup/>
            </div>
            <div role="tabpanel" className={`tab-pane fade ${currentTab === ABOUT ? "active show" : ""}`}>
              <p>This is a remake of Dong Nguyen's Flappy Bird, the video game, with added multiplayer to compete with friends.</p>
              <p><small>Multiplayer is not yet implemented.</small></p>
              <h2>How to Play</h2>
              <ul>
                <li>Tap the screen or hit spacebar to flap upwards.</li>
                <li>Wait for gravity to fall downwards.</li>
                <li>Avoid obstacles and stay in flight the longest to win!</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="col-sm-6 px-0">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link active`}
                role="tab"
                onClick={() => {setCurrentTab("CHAT")}}>
                <h1>Chat</h1>
              </button>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export default IndexPage
