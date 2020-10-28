import Axios from "axios"
import React, { useEffect } from "react"

import Layout from "../components/layout"
import TabAbout from "../components/tabAbout"
import TabSetup from "../components/tabSetup"
import TabChat from "../components/tabChat"
import SideSection from "../components/sideSection"
import TabGame from "../components/tabGame"
import Navbar from "../components/navbar"

import store from "../utils/store"
import { SETUP, ABOUT, CHAT, GAME } from "../utils/constants"

const IndexPage = () => {

  /** popstate event handler */
  const updateTab = (tab) => {
    store.dispatch({
      type: "ui",
      payload: {
        tab: window.location.hash.slice(1)
      }
    })
  }

  /** Get game and lobby data from backend.
   * @param  {string} join - join query string value
   * @param  {string} id - player's peer-to-peer connection id
   */
  const joinGame = async (id) => {
    const query = new URLSearchParams(window.location.query)
    const join = query.get("join")

    if (join) {
      // var response = await Axios.post(`http://localhost:8080/api/join/${join}`, data)
      var response = await Axios.post(`/api/join/${join}`, {id})
    }
    else {
      // var response = await Axios.post(`http://localhost:8080/api/new`, data)
      var response = await Axios.post(`/api/new`, {id})
    }

    store.dispatch({
      type: "game",
      payload: response.data,
    })
  }

  /** Add event listeners and connect to game lobby */
  const init = async () => {
    if (typeof window !== typeof undefined) {
      window.addEventListener("popstate", updateTab)

      const {default: Peer} = await import("peerjs")
      const peer = new Peer()
      peer.on("open", joinGame)
    }
  }

  useEffect(() => {init()}, [])

  return (
    <Layout>
      <div className="row m-0">
        <Navbar />
        <section className="col-12 p-0">
          <div className="mx-4">
            <TabSetup tab={SETUP} />
            <TabGame tab={GAME} />
            <TabAbout tab={ABOUT} />
            <TabChat tab={CHAT} />
          </div>
        </section>
        <SideSection />
      </div>
    </Layout>
  )
}

export default IndexPage
