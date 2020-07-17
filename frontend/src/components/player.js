import React, { Component } from "react"
import * as PIXI from "pixi.js"
import { withApp, Sprite } from "react-pixi-fiber"

import spriteSheet from "../images/spritesheet.svg"

const sprites = PIXI.BaseTexture.from(spriteSheet, {resolution: 1})

const bodyTex1 = new PIXI.Texture(sprites, new PIXI.Rectangle(0, 65, 34, 34))
const bodyTex2 = new PIXI.Texture(sprites, new PIXI.Rectangle(35, 65, 34, 34))
const bodyTex3 = new PIXI.Texture(sprites, new PIXI.Rectangle(70, 65, 34, 34))

const wingTex1 = new PIXI.Texture(sprites, new PIXI.Rectangle(0, 100, 34, 34))
const wingTex2 = new PIXI.Texture(sprites, new PIXI.Rectangle(35, 100, 34, 34))
const wingTex3 = new PIXI.Texture(sprites, new PIXI.Rectangle(70, 100, 34, 34))

const wingFrames = [wingTex1, wingTex2, wingTex3, wingTex2]

const faceTex1 = new PIXI.Texture(sprites, new PIXI.Rectangle(0, 135, 34, 34))
const faceTex2 = new PIXI.Texture(sprites, new PIXI.Rectangle(35, 135, 34, 34))

const center = new PIXI.Point(0.5, 0.5)

const GRAVITY = 0.4
const TVELOCITY = 6

class Player extends Component {
    state = {
        frame: 0,
        frameCount: 0,
        x: 160,
        y: 240,
        dy: 0,
    }

    update = (delta) => {
        const newState = {...this.state}
        this.animate(delta, newState)
        this.gravity(delta, newState)
        this.setState(newState)
    }
    
    animate = (delta, state) => {
        // animate wings flaping at 12 fps
        if (state.frameCount + delta >= 5) {
            state.frameCount += delta - 5
            state.frame = (state.frame + 1) % 4
        }
        else {
            state.frameCount += delta
        }
    }
    
    gravity = (t, state) => {
        state.y = Math.min(Math.max(state.y + state.dy * t - GRAVITY * (t - 1), 16), 463)
        state.dy = Math.min(state.dy + GRAVITY * t, TVELOCITY)
    }
    
    flap = (e) => {
        // click or spacebar
        if ((e instanceof MouseEvent && e.target.tagName === "CANVAS") || (e instanceof KeyboardEvent && e.key === " ")) {
            this.setState({ dy: -1 * TVELOCITY})
        }
    }

    componentDidMount() {
        this.props.app.ticker.add(this.update)
        window.addEventListener("keydown", this.flap)
        window.addEventListener("click", this.flap)
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.update)
        window.removeEventListener("keydown", this.flap)
        window.removeEventListener("click", this.flap)
    }

    render() {
        return (
            <>
                <Sprite anchor={center} x={this.state.x} y={this.state.y} texture={bodyTex1} tint={0xff0000} />
                <Sprite anchor={center} x={this.state.x} y={this.state.y} texture={bodyTex2} tint={0xffffff} />
                <Sprite anchor={center} x={this.state.x} y={this.state.y} texture={wingFrames[this.state.frame]} tint={0xffffff} />
                <Sprite anchor={center} x={this.state.x} y={this.state.y} texture={faceTex1} />
                <Sprite anchor={center} x={this.state.x} y={this.state.y} texture={bodyTex3} tint={0xffffff} />
            </>
        )
    }
}

export default withApp(Player)