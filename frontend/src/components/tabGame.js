import React from "react"
import { connect } from "react-redux"
import loadable from "@loadable/component"

const Game = loadable(() => import("./game"))

const TabGame = ({game, tab}) => {
    return (
        <div
            role="tabpanel"
            style={{height: 0, paddingBottom: "150%"}}
            hidden={game.tab !== tab}>
            {game.tab !== tab && <Game />}
        </div>
    )
}

export default connect(({game}) => ({game}))(TabGame)