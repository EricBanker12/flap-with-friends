import React from "react"
import { connect } from "react-redux"
import loadable from "@loadable/component"
import { GAME } from "../utils/constants"

const Game = loadable(() => import("./game"))

const TabGame = ({ui}) => {

    if (!RegExp(GAME).test(ui.tab)) {
        return null
    }

    return (
        <div>
            <Game />
        </div>
    )
}

export default connect(({ui}) => ({ui}))(TabGame)