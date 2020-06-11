import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

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
        <p>This is a remake of Dong Nguyen's Flappy Bird with private multiplayer to compete with friends. It's a great way to do team-bonding on a new assignment or a slow, Friday afternoon.</p>
        
        <h1>How to Play</h1>
        <ul>
          <li>Tap the screen or hit the spacebar to flap upwards.</li>
          <li>Wait for gravity to fall downwards.</li>
          <li>Avoid the obstacles to stay in flight the longest and win!</li>
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
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 70px)',
            backgroundColor: '#DDD',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Game Setup Component
        </div>
      </section>
    </div>
  </Layout>
)

export default IndexPage
