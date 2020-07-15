import React from "react"
// import * as PIXI from "pixi.js"
import { Stage } from "react-pixi-fiber"

import Player from "./player"
import Obstacle from "./obstacle"
import Cloud from "./cloud"

const Game = (props) => {
    return(
        <Stage {...props} options={{width: 320, height: 480, backgroundColor: 0x75CAEB}}>
            <Cloud />
            <Obstacle />
            {/* other players */}
            <Player />
            {/* score overlay */}
        </Stage>
    )
}

export default Game