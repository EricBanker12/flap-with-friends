import React from "react"
import { Link } from "gatsby"

const NavbarTab = ({ tab = "", hidden }) => {
    return (
        <li
            className="nav-item"
            hidden={hidden}>
            <Link
                className="nav-link"
                to={`/${tab.toLowerCase()}`}>
                <span className="mt-3" style={{fontSize: "1.75rem", fontWeight: 500}}>
                    {tab}
                </span>
            </Link>
        </li>
    )
}

export default NavbarTab