import React, { useState, useEffect, useCallback } from "react"
import { throttle } from "lodash-core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tab from "../components/tab"
import TabAbout from "../components/tabAbout"
import TabSetup from "../components/tabSetup"
import TabChat from "../components/tabChat"

const SETUP = "Setup"
const ABOUT = "About"
const CHAT = "Chat"

const IndexPage = () => {
  const [currentTab, setCurrentTab] = useState(SETUP)
  const [isMobile, setIsMobile] = useState(false)

  const resize = useCallback(() => {
    if (!isMobile && window.innerWidth < 576) {
      setIsMobile(true)
    }
    else if (isMobile && window.innerWidth >= 576) {
      setIsMobile(false)
    }
  }, [isMobile, setIsMobile])

  const resizeHandler = useCallback(throttle(resize, 100), [resize])

  useEffect(() => {
    if (typeof window !== typeof undefined) {
      resize()
      window.addEventListener("resize", resizeHandler)
      return () => {window.removeEventListener("resize", resizeHandler)}
    }
  }, [resize, resizeHandler])

  return (
    <Layout>
      <SEO title="Home" />
      <div className="row m-0">
        <section className="col-sm-6 col-xs-12 p-0">
          <ul className="nav nav-tabs"> 
            <Tab text={SETUP} active={currentTab === SETUP} onClick={() => {setCurrentTab(SETUP)}} />
            <Tab text={ABOUT} active={currentTab === ABOUT} onClick={() => {setCurrentTab(ABOUT)}} />
            <Tab text={CHAT} active={currentTab === CHAT} onClick={() => {setCurrentTab(CHAT)}} hidden={!isMobile} />
          </ul>
          <div className="mx-4">
            <TabSetup hidden={currentTab !== SETUP} />
            <TabAbout hidden={currentTab !== ABOUT} />
            <TabChat hidden={currentTab !== CHAT} />
          </div>
        </section>
        <section className="col-sm-6 px-0">
          <ul className="nav nav-tabs">
            <Tab text={CHAT} active={true} hidden={isMobile} />
          </ul>
          <div className="mx-4">
            <TabChat hidden={isMobile} />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default IndexPage
