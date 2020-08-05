import React, { useCallback } from "react"
import { connect } from "react-redux"

const NavbarTab = ({tab, hidden, ui, dispatch}) => {
    
    const onClick = useCallback((e) => {
        e.preventDefault()
        dispatch({
            type: "ui",
            payload: {tab},
        })
    }, [tab, dispatch])

    return (
        <li
            className="nav-item"
            hidden={ui.tab === tab || hidden}>
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