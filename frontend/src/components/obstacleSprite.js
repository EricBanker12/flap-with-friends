import React, { Component } from "react"
import * as PIXI from "pixi.js"
import { withApp, Sprite } from "react-pixi-fiber"
import { connect } from "react-redux"

import hitObstacleSFX from "../audio/hit_obstacle.mp3"

const flip = new PIXI.Point(1, -1)
const center = new PIXI.Point(0.5, 0)

class ObstacleSprite extends Component {
    state = {
        x: 480,
        y: 176,
        dx: 2,
        scored: false,
    }

    update = (delta) => {
        const state = {...this.state}
        const player = {...this.props.player}

        // kill
        if (player.alive) {
            // top/bottom
            const diffX = Math.abs(state.x - player.x)
            if (diffX <= 31 && (player.y <= state.y + 13 || player.y >= state.y + 110)) {
                player.dx = state.dx
                player.alive = false
            }
            // left/right
            else if (diffX <= 46 && (player.y <= state.y - 2 || player.y >= state.y + 125)) {
                player.dx = state.dx
                player.alive = false
            }
            // top left
            else if (Math.sqrt((player.x - state.x + 31)**2 + (player.y - state.y + 2)**2) <= 15) {
                player.dx = state.dx
                player.alive = false
            }
            // top right
            else if (Math.sqrt((player.x - state.x - 31)**2 + (player.y - state.y + 2)**2) <= 15) {
                player.dx = state.dx
                player.alive = false
            }
            // bottom left
            else if (Math.sqrt((player.x - state.x + 31)**2 + (player.y - state.y - 125)**2) <= 15) {
                player.dx = state.dx
                player.alive = false
            }
            // bottom right
            else if (Math.sqrt((player.x - state.x - 31)**2 + (player.y - state.y - 125)**2) <= 15) {
                player.dx = state.dx
                player.alive = false
            }
            // sound
            if (!player.alive && this.props.audio.current) {
                this.props.audio.current.src = hitObstacleSFX
                this.props.audio.current.play()
            }
        }

        // score
        if (!state.scored && player.x > state.x) {
            state.scored = true
            player.score += 1
        }

        // update obstacle position and gap
        state.x = state.x - state.dx * delta
        if (state.x <= -33) {
            state.x = 353
            state.y = 80 + Math.floor(Math.random() * 198)
            state.scored = false
        }

        this.setState(state)

        this.props.dispatch({
            type: "player",
            payload: player,
        })
    }

    componentDidMount() {
        this.props.app.ticker.add(this.update)
        if (this.props.x) {
            this.setState({x: this.props.x})
        }
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.update)
    }
    
    render() {
        return (
            <>
                <Sprite
                    x={this.state.x * this.props.game.scale}
                    y={this.state.y * this.props.game.scale}
                    anchor={center}
                    scale={flip}
                    texture={this.props.texture}
                />
                <Sprite
                    x={this.state.x * this.props.game.scale}
                    y={(this.state.y + 123) * this.props.game.scale}
                    anchor={center}
                    texture={this.props.texture}
                />
            </>
        )
    }
}

export default withApp(connect(({game, player}) => ({game, player}))(ObstacleSprite))