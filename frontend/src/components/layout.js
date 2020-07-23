/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Provider } from "react-redux"

import Header from "./header"
import Footer from "./footer"

import store from "../utils/store"

import "../styles/bootstrap.min.css"
import "../styles/layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Provider store={store}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="layout" style={{background: "#fff", margin: "0 auto", flex: 1, width: "100%", maxWidth: 864}}>
        <main>{children}</main>
        <Footer />
      </div>
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
