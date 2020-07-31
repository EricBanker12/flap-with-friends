import React from "react"
import { connect } from "react-redux"

const TabChat = ({ game, tab, device }) => {
    
    return (
        <div hidden={(tab && game.tab !== tab) || (device && game.device !== device)}>
            <span>chat goes here</span>
        </div>
    )
}

export default connect(({game}) => ({game}))(TabChat)