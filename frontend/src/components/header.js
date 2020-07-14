import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="navbar navbar-dark bg-primary">
    <h1 style={{margin: "0 auto", textAlign: "center"}}>
      <Link to="/" style={{color: "#fff"}}>
        {siteTitle}
      </Link>
    </h1>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
