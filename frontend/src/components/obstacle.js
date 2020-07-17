import React, { Component } from "react"
import * as PIXI from "pixi.js"
import { withApp, Sprite } from "react-pixi-fiber"

import spriteSheet from "../images/spritesheet.svg"

const sprites = PIXI.BaseTexture.from(spriteSheet, {resolution: 1})

const obstacleTex = new PIXI.Texture(sprites, new PIXI.Rectangle(0, 169, 66, 400))

const center = new PIXI.Point(0.5, 0)
const flip = new PIXI.Point(1, -1)

class Obstacle extends Component {
    state = {
        y: 190,
        x: 353,
        dx: 2,
    }

    update = (delta) => {
        const x = this.state.x - this.state.dx * delta
        if (x > 110) this.setState({x})
        else {
            this.setState({x: 353, y: 80 + Math.floor(Math.random() * 221)})
        }
    }

    componentDidMount() {
        this.props.app.ticker.add(this.update)
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.update)
    }
    
    render() {
        return (
            <>
                <Sprite x={this.state.x} y={this.state.y} anchor={center} scale={flip} texture={obstacleTex} />
                <Sprite x={this.state.x} y={this.state.y + 100} anchor={center} texture={obstacleTex} />
            </>
        )
    }
}

export default withApp(Obstacle)