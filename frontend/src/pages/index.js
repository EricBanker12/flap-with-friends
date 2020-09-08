import Axios from "axios"
import React, { useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TabAbout from "../components/tabAbout"
import TabSetup from "../components/tabSetup"
import TabChat from "../components/tabChat"
import SideSection from "../components/sideSection"
import TabGame from "../components/tabGame"
import Navbar from "../components/navbar"

import store from "../utils/store"
import { MOBILE, SETUP, ABOUT, CHAT, GAME } from "../utils/constants"

const IndexPage = () => {
  const init = async () => {
    if (typeof window !== typeof undefined) {
      const {default: Peer} = await import("peerjs")
      const query = new URLSearchParams(window.location)
      const join = query.get("join")
      const peer = new Peer()
      peer.on("open", async () => {
        const data = {id: peer.id}
    
        if (join) {
          // var response = await Axios.post(`http://localhost:8080/api/join/${join}`, data)
          var response = await Axios.post(`/api/join/${join}`, data)
        }
        else {
          // var response = await Axios.post(`http://localhost:8080/api/new`, data)
          var response = await Axios.post(`/api/new`, data)
        }
    
        // console.log(response)
    
        store.dispatch({
          type: "game",
          payload: response.data,
        })
      })
    }
  }

  useEffect(() => {init()}, [])

  return (
    <Layout>
      <SEO title="Home" />
      <div className="row m-0">
        <Navbar />
        <section className="col-md-6 col-sm-12 p-0">
          <div className="mx-4">
            <TabSetup tab={SETUP} />
            <TabGame tab={GAME} />
            <TabAbout tab={ABOUT} />
            <TabChat tab={CHAT} device={MOBILE} />
          </div>
        </section>
        <SideSection />
      </div>
    </Layout>
  )
}

export default IndexPage
