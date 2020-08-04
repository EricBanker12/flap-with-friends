import React, { useCallback } from "react"
import { connect } from "react-redux"

const NavbarTab = ({tab, hidden, game, dispatch}) => {
    
    const onClick = useCallback((e) => {
        e.preventDefault()
        dispatch({
            type: "game",
            payload: {tab},
        })
    }, [tab, dispatch])

    return (
        <li
            className="nav-item"
            hidden={game.tab === tab || hidden}>
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

export default connect(({game}) => ({game}))(NavbarTab)