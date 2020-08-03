import React from "react"
import { connect } from "react-redux"
import loadable from "@loadable/component"

const Game = loadable(() => import("./game"))

const TabGame = ({game, tab}) => {
    return (
        <div
            role="tabpanel"
            hidden={game.tab !== tab}>
            <Game hidden={game.tab !== tab} />
        </div>
    )
}

export default connect(({game}) => ({game}))(TabGame)