import React, { useEffect, useState } from "react"
import * as PIXI from "pixi.js"
import { withApp, Sprite } from "react-pixi-fiber"

import spriteSheet from "../images/spritesheet.svg"

const sprites = PIXI.BaseTexture.from(spriteSheet, {resolution: 1})

const bodyTex1 = new PIXI.Texture(sprites, new PIXI.Rectangle(0, 64, 33, 33))
const bodyTex2 = new PIXI.Texture(sprites, new PIXI.Rectangle(34, 64, 33, 33))

const wingTex1 = new PIXI.Texture(sprites, new PIXI.Rectangle(0, 98, 33, 33))
const wingTex2 = new PIXI.Texture(sprites, new PIXI.Rectangle(34, 98, 33, 33))
const wingTex3 = new PIXI.Texture(sprites, new PIXI.Rectangle(68, 98, 33, 33))

const wingFrames = [wingTex1, wingTex2, wingTex3, wingTex2]

const faceTex1 = new PIXI.Texture(sprites, new PIXI.Rectangle(0, 132, 33, 33))
const faceTex2 = new PIXI.Texture(sprites, new PIXI.Rectangle(34, 132, 33, 33))

const Player = ({app}) => {
    const [frame, setFrame] = useState(0)
    const [frameCount, setFrameCount] = useState(0)
    
    const animate = (delta) => {
        if (frameCount + delta >= 5) {
            setFrameCount(frameCount + delta - 5)
            setFrame((frame + 1) % 4)
        }
        else {
            setFrameCount(frameCount + delta)
        }
    }
    
    useEffect(() => {
        app.ticker.add(animate)
        return () => {app.ticker.remove(animate)}
    })

    return (
        <>
            <Sprite texture={bodyTex1} tint={0xff0000} />
            <Sprite texture={bodyTex2} tint={0xffccff} />
            <Sprite texture={wingFrames[frame]} tint={0xffccff} />
            <Sprite texture={faceTex1} />
        </>
    )
}

export default withApp(Player)