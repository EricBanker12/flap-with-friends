/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Provider } from "react-redux"

import Header from "./header"

import store from "../utils/store"

import "../styles/bootstrap.min.css"
import "../styles/layout.css"

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <Header />
      <div className="container-fluid p-0 bg-white flex-grow-1" style={{maxWidth: "48rem"}}>
        {children}
      </div>
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
