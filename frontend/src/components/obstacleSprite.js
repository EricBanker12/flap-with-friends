import React, { Component } from "react"
import * as PIXI from "pixi.js"
import { withApp, Sprite } from "react-pixi-fiber"
import { connect } from "react-redux"

import hitObstacleSFX from "../audio/hit_obstacle.mp3"

const flip = new PIXI.Point(1, -1)
const center = new PIXI.Point(0.5, 0)

class ObstacleSprite extends Component {

    update = (delta) => {
        let {x, dx, y, alive, score} = this.props.player
        
        const obstacle = this.props.obstacles[this.props.obstacle]
        obstacle.y = this.props.game.obstacles[obstacle.id]

        // kill
        if (alive) {
            // top/bottom
            const diffX = Math.abs(obstacle.x - x)
            if (diffX <= 31 && (y <= obstacle.y + 13 || y >= obstacle.y + 110)) {
                alive = false
            }
            // left/right
            else if (diffX <= 46 && (y <= obstacle.y - 2 || y >= obstacle.y + 125)) {
                alive = false
            }
            // top left
            else if (Math.sqrt((x - obstacle.x + 31)**2 + (y - obstacle.y + 2)**2) <= 15) {
                alive = false
            }
            // top right
            else if (Math.sqrt((x - obstacle.x - 31)**2 + (y - obstacle.y + 2)**2) <= 15) {
                alive = false
            }
            // bottom left
            else if (Math.sqrt((x - obstacle.x + 31)**2 + (y - obstacle.y - 125)**2) <= 15) {
                alive = false
            }
            // bottom right
            else if (Math.sqrt((x - obstacle.x - 31)**2 + (y - obstacle.y - 125)**2) <= 15) {
                alive = false
            }
            // sound
            if (!alive && this.props.audio.current) {
                this.props.audio.current.src = hitObstacleSFX
                this.props.audio.current.play()
            }
        }

        if (!alive) {
            dx = 0
        }

        // score
        if (!obstacle.scored && x > obstacle.x) {
            obstacle.scored = true
            score += 1
        }

        // update obstacle
        if (obstacle.x - x <= -193) {
            obstacle.id = (obstacle.id + 2) % this.props.game.obstacles.length
            obstacle.x += 386
            obstacle.scored = false
        }

        this.props.dispatch({
            type: "player",
            payload: {x, dx, alive, score},
        })

        this.props.dispatch({
            type: "obstacles",
            payload: {
                [this.props.obstacle]: {
                    id: obstacle.id,
                    x: obstacle.x,
                    scored: obstacle.scored,
                }
            }
        })
    }

    componentDidMount() {
        this.props.app.ticker.add(this.update)
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.update)
    }
    
    render() {
        const obstacle = this.props.obstacles[this.props.obstacle]
        obstacle.y = this.props.game.obstacles[obstacle.id]
        const player = this.props.player
        const scale = this.props.game.scale
        return (
            <>
                <Sprite
                    x={(160 + obstacle.x - player.x) * scale}
                    y={obstacle.y * scale}
                    anchor={center}
                    scale={flip}
                    texture={this.props.texture}
                />
                <Sprite
                    x={(160 + obstacle.x - player.x) * scale}
                    y={(obstacle.y + 123) * scale}
                    anchor={center}
                    texture={this.props.texture}
                />
            </>
        )
    }
}

export default withApp(connect(({game, player, obstacles}) => ({game, player, obstacles}))(ObstacleSprite))