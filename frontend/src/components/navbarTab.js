import React from "react"
import { connect } from "react-redux"

const NavbarTab = ({tab, ui, dispatch}) => {
    
    const onClick = (e) => {
        dispatch({
            type: "ui",
            payload: {showTabs: false},
        })
    }

    return (
        <li
            className="nav-item"
            hidden={RegExp(tab).test(ui.tab)}>
            <a
                className="nav-link"
                href={`#${tab}`}
                onClick={onClick}>
                <span className="mt-3" style={{fontSize: "1.75rem", fontWeight: 500}}>
                    {tab}
                </span>
            </a>
        </li>
    )
}

export default connect(({ui}) => ({ui}))(NavbarTab)