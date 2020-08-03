import React, { useCallback } from "react"
import { connect } from "react-redux"

const Tab = ({tab, game, dispatch}) => {
    
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
            hidden={game.tab === tab}>
            <a
                className="nav-link"
                href={`#${tab}`}
                onClick={onClick}>
                <h1 className="m-0">
                    {tab}
                </h1>
            </a>
        </li>
    )
}

export default connect(({game}) => ({game}))(Tab)