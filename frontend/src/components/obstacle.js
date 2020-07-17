import React from "react"
import * as PIXI from "pixi.js"
import { withApp, Sprite } from "react-pixi-fiber"

import spriteSheet from "../images/spritesheet.svg"

const sprites = PIXI.BaseTexture.from(spriteSheet, {resolution: 1})

const obstacleTex = new PIXI.Texture(sprites, new PIXI.Rectangle(0, 169, 66, 400))

const Obstacle = ({app}) => {

    return (
        <Sprite texture={obstacleTex} />
    )
}

export default withApp(Obstacle)