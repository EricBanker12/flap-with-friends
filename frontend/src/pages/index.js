import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import GameSetup from "../components/gameSetup"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: '50% 50%',
      }}
    >
      <section>
        <h1>About</h1>
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
            // margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Gameplay Animation Here
        </div>
      </section>
      
      <section>
        <h1>Setup</h1>
        <GameSetup/>
      </section>
    </div>
  </Layout>
)

export default IndexPage
