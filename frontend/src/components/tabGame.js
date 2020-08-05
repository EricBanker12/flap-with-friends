import React from "react"
import { connect } from "react-redux"
import loadable from "@loadable/component"

const Game = loadable(() => import("./game"))

const TabGame = ({ui, tab}) => {

    if (ui.tab !== tab) {
        return null
    }

    return (
        <div>
            <Game />
        </div>
    )
}

export default connect(({ui}) => ({ui}))(TabGame)