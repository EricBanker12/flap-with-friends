import React from "react"
import * as PIXI from "pixi.js"
import { withApp, Sprite } from "react-pixi-fiber"

import spriteSheet from "../images/spritesheet.svg"

const sprites = PIXI.BaseTexture.from(spriteSheet, {resolution: 1})

const cloudTex = new PIXI.Texture(sprites, new PIXI.Rectangle(0, 0, 128, 64))

const Cloud = ({app}) => {

    return (
        <Sprite texture={cloudTex} />
    )
}

export default withApp(Cloud)