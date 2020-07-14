import React, { useState } from "react"
import { Link } from "gatsby"

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
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%',
        }}
      >
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
              <p>This is a remake of Dong Nguyen's Flappy Bird with private multiplayer to compete with friends.</p>
            
              <h2>How to Play</h2>
              <ul>
                <li>Tap the screen or hit spacebar to flap upwards.</li>
                <li>Wait for gravity to fall downwards.</li>
                <li>Avoid obstacles and stay in flight the longest to win!</li>
              </ul>
              
              <div
                style={{
                  width: 320,
                  height: 480,
                  backgroundColor: 'skyblue',
                  border: "1px solid black",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <h2>Game Animation Here</h2>
              </div>
            </div>
          </div>
        </section>
        
        <section>
        <div
          style={{
            width: 320,
            height: 480,
            border: '1px solid black',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <h2>Chat Here</h2>
        </div>
        </section>
      </div>
    </Layout>
  )
}

export default IndexPage
