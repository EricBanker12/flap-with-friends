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
import SEO from "./seo"

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
      <SEO />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="container-md bg-white px-0 flex-grow-1">
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
