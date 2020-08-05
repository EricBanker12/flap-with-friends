import React from "react"
import { connect } from "react-redux"

const TabChat = ({ ui, tab, device }) => {
    
    if ((tab && ui.tab !== tab) || (device && ui.device !== device)) {
        return null
    }

    return (
        <div>
            <span>chat goes here</span>
        </div>
    )
}

export default connect(({ui}) => ({ui}))(TabChat)