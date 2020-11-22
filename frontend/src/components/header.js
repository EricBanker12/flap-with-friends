import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header className="navbar navbar-dark bg-primary">
      <h1 style={{margin: "0 auto", textAlign: "center", color: "#fff"}}>
        {data.site.siteMetadata.title}
      </h1>
    </header>
  )
}

export default Header
