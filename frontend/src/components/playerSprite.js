import React, { Component } from "react"
import * as PIXI from "pixi.js"
import { withApp, Sprite } from "react-pixi-fiber"
import { connect } from "react-redux"

import playerFlapSFX from "../audio/player_flap.mp3"

const GRAVITY = 0.3
const TVELOCITY = 6

const center = new PIXI.Point(0.5, 0.5)

const wingFrames = [
    "wingTex1",
    "wingTex2",
    "wingTex3",
    "wingTex2",
]

class PlayerSprite extends Component {
    state = {
        frame: 0,
        frameCount: 0,
    }

    update = (delta) => {
        let {x, dx, y, dy, alive} = this.props.player

        // animate wings flaping at 12 fps
        if (alive) {
            if (this.state.frameCount + delta >= 5) {
                this.setState({
                    frameCount: this.state.frameCount + delta - 5,
                    frame: (this.state.frame + 1) % 4,
                })
            }
            else {
                this.setState({frameCount: this.state.frameCount + delta})
            }
        }

        // gravity
        for (let i = 0; i < delta; i++) {
            y = Math.min(Math.max(y + dy, 17), 463)
            dy = Math.min(dy + GRAVITY, TVELOCITY)
        }

        x += dx * delta

        this.props.dispatch({
            type: "player",
            payload: {x, y, dy},
        })

        // game over
        if (!this.props.game.ended && !alive && y === 463) {
            this.props.dispatch({
                type: "game",
                payload: {ended: true},
            })
        }
    }
    
    flap = (e) => {
        if (
            this.props.player.alive && (
                (e instanceof MouseEvent && e.button === 0 && e.target.tagName === "CANVAS") ||
                (e instanceof KeyboardEvent && e.key === " ") ||
                (e instanceof TouchEvent && e.target.tagName === "CANVAS"))
            ) {
            this.props.dispatch({
                type: "player",
                payload: {
                    dy: -TVELOCITY
                }
            })

            if (this.props.audio.current) {
                this.props.audio.current.src = playerFlapSFX
                this.props.audio.current.play()
            }

            e.preventDefault() // does not stop click/highlight because synthetic event queue
        }
    }

    preventClick = (e) => {
        if (e.button === 0 && e.target.tagName === "CANVAS") {
            e.preventDefault()
        }
    }

    componentDidMount() {
        this.props.app.ticker.add(this.update)
        document.addEventListener("keydown", this.flap)
        document.addEventListener("mousedown", this.flap)
        document.addEventListener("touchstart", this.flap)
        document.addEventListener("click", this.preventClick)
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.update)
        document.removeEventListener("keydown", this.flap)
        document.removeEventListener("mousedown", this.flap)
        document.removeEventListener("touchstart", this.flap)
        document.removeEventListener("click", this.preventClick)
    }

    render() {
        return (
            <>
                <Sprite
                    anchor={center}
                    x={160 * this.props.game.scale}
                    y={this.props.player.y * this.props.game.scale}
                    texture={this.props.textures.bodyTex1}
                    tint={this.props.player.mainColor}
                />
                <Sprite
                    anchor={center}
                    x={160 * this.props.game.scale}
                    y={this.props.player.y * this.props.game.scale}
                    texture={this.props.textures.bodyTex2}
                    tint={this.props.player.accentColor}
                />
                <Sprite
                    anchor={center}
                    x={160 * this.props.game.scale}
                    y={this.props.player.y * this.props.game.scale}
                    texture={this.props.textures[wingFrames[this.state.frame]]}
                    tint={this.props.player.accentColor}
                />
                <Sprite
                    anchor={center}
                    x={160 * this.props.game.scale}
                    y={this.props.player.y * this.props.game.scale}
                    texture={this.props.textures.faceTex1}
                />
                <Sprite
                    anchor={center}
                    x={160 * this.props.game.scale}
                    y={this.props.player.y * this.props.game.scale}
                    texture={this.props.textures.bodyTex3}
                    tint={this.props.player.accentColor}
                />
                {!this.props.player.alive && (
                    <Sprite
                        anchor={center}
                        x={160 * this.props.game.scale}
                        y={this.props.player.y * this.props.game.scale}
                        texture={this.props.textures.faceTex2}
                    />
                )}
            </>
        )
    }
}

export default withApp(connect(({game, player}) => ({game, player}))(PlayerSprite))