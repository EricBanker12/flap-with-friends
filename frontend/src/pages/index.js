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
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel tempus neque. Nunc tempor mauris ut ligula tincidunt, id accumsan risus semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent mattis justo dui, quis sodales mi luctus vel.</p>
        <h1>How to Play</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel tempus neque. Nunc tempor mauris ut ligula tincidunt, id accumsan risus semper.</p>
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
