import React, { Component } from "react"
import * as PIXI from "pixi.js"
import { Sprite, withApp } from "react-pixi-fiber"

import spriteSheet from "../images/spritesheet.svg"

const sprites = PIXI.BaseTexture.from(spriteSheet, {resolution: 1})

const bodyTex1 = new PIXI.Texture(sprites, new PIXI.Rectangle(0, 65, 34, 34))
const bodyTex2 = new PIXI.Texture(sprites, new PIXI.Rectangle(35, 65, 34, 34))
const bodyTex3 = new PIXI.Texture(sprites, new PIXI.Rectangle(70, 65, 34, 34))
const wingTex1 = new PIXI.Texture(sprites, new PIXI.Rectangle(0, 100, 34, 34))
const wingTex2 = new PIXI.Texture(sprites, new PIXI.Rectangle(35, 100, 34, 34))
const wingTex3 = new PIXI.Texture(sprites, new PIXI.Rectangle(70, 100, 34, 34))
const faceTex1 = new PIXI.Texture(sprites, new PIXI.Rectangle(0, 135, 34, 34))

const wingFrames = [wingTex1, wingTex2, wingTex3, wingTex2]

const center = new PIXI.Point(0.5, 0.5)

class PlayerPreview extends Component {
    state = {
        frame: 0,
        frameCount: 0,
    }
    
    animate = (delta) => {
        // animate wings flaping at 12 fps
        if (this.state.frameCount + delta >= 5) {
            this.setState({
                frame: (this.state.frame + 1) % 4,
                frameCount: this.state.frameCount + delta - 5,
            })
        }
        else {
            this.setState({
                frameCount: this.state.frameCount + delta,
            })
        }
    }

    componentDidMount() {
        this.props.app.ticker.add(this.animate)
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.animate)
    }

    render() {
        return (
            <>
                <Sprite anchor={center} {...this.props} texture={bodyTex1} tint={this.props.mainColor} />
                <Sprite anchor={center} {...this.props} texture={bodyTex2} tint={this.props.accentColor} />
                <Sprite anchor={center} {...this.props} texture={wingFrames[this.state.frame]} tint={this.props.accentColor} />
                <Sprite anchor={center} {...this.props} texture={faceTex1} />
                <Sprite anchor={center} {...this.props} texture={bodyTex3} tint={this.props.accentColor} />
            </>
        )
    }

}

export default withApp(PlayerPreview)