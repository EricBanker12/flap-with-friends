import Axios from "axios"
import React, { useEffect } from "react"

import Layout from "../components/layout"
import TabAbout from "../components/tabAbout"
import TabSetup from "../components/tabSetup"
import TabGame from "../components/tabGame"
import Navbar from "../components/navbar"
import TabJoin from "../components/tabJoin"
import Chat from "../components/chat"

import store from "../utils/store"

const IndexPage = () => {

  /** popstate event handler */
  const updateTab = (tab) => {
    window.scroll({top: 0, left: 0, behavior: "auto"})
    store.dispatch({
      type: "ui",
      payload: {
        tab: window.location.hash
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
            <TabSetup />
            <TabGame />
            <TabAbout />
            <TabJoin />
            <Chat />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default IndexPage
