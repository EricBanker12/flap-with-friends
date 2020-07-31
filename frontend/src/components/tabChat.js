import React from "react"
import { connect } from "react-redux"

const TabChat = ({ game, hidden }) => {
    
    return (
        <div hidden={game.tab !== "Chat" || hidden}>
            <span>chat goes here</span>
        </div>
    )
}

export default connect(({game}) => ({game}))(TabChat)