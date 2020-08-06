import React from "react"
import { connect } from "react-redux"

import Chat from "./chat"

const TabChat = ({ ui, tab, device }) => {
    
    if ((tab && ui.tab !== tab) || (device && ui.device !== device)) {
        return null
    }

    return (
        <div className="my-4">
            <Chat />
        </div>
    )
}

export default connect(({ui}) => ({ui}))(TabChat)