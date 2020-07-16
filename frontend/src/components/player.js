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

const center = new PIXI.Point(0.5, 0.5)

const Player = ({app}) => {
    const [state, setState] = useState({
        frame: 0,
        frameCount: 0,
        x: 160,
        y: 240,
        dy: 0,
    })

    const update = (delta) => {
        const newState = {...state}
        animate(delta, newState)
        gravity(delta, newState)
        setState(newState)
    }
    
    const animate = (delta, state) => {
        // animate wings flaping at 12 fps
        if (state.frameCount + delta >= 5) {
            state.frameCount += delta - 5
            state.frame = (state.frame + 1) % 4
        }
        else {
            state.frameCount += delta
        }
    }
    
    const gravity = (t, state) => {
        const g = 0.667
        const termVel = 10
        state.y = Math.min(Math.max(state.y + state.dy * t - g * (t - 1), 0), 480)
        state.dy = Math.min(state.dy + g * t, termVel)
    }
    
    const flap = (e) => {
        // click or spacebar
        if ((e instanceof MouseEvent && e.target.tagName === "CANVAS") || (e instanceof KeyboardEvent && e.key === " ")) {
            setState({...state, dy: -10})
            console.log("flap", state.dy)
        }
    }

    useEffect(() => {
        console.log("useEffect")
        // componentDidMount
        app.ticker.add(update)
        window.addEventListener("keydown", flap)
        window.addEventListener("click", flap)

        // componentWillUnmount
        return () => {
            app.ticker.remove(update)
            window.removeEventListener("keydown", flap)
            window.removeEventListener("click", flap)
        }
    }, [])

    return (
        <>
            <Sprite anchor={center} x={state.x} y={state.y} texture={bodyTex1} tint={0xff0000} />
            <Sprite anchor={center} x={state.x} y={state.y} texture={bodyTex2} tint={0xffccff} />
            <Sprite anchor={center} x={state.x} y={state.y} texture={wingFrames[state.frame]} tint={0xffccff} />
            <Sprite anchor={center} x={state.x} y={state.y} texture={faceTex1} />
        </>
    )
}

export default withApp(Player)