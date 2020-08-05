import * as PIXI from "pixi.js"
import { Howl } from "howler"

import store from "../utils/store"

import hitObstacle from "../audio/hit_obstacle.mp3"

const GAP_HEIGHT = 115
const GAP_VARIENCE = 206
const OBSTACLE_DIST = 193
const OBSTACLE_WIDTH = 62
const PLAYER_RADIUS = 15
const STROKE_WIDTH = 2

class GameObstacle {
    constructor(app, index) {
        this.app = app
        this.index = index

        this.wait = false

        const { game, player } = store.getState()

        this.x = OBSTACLE_DIST * index
        this.y = game.obstacles[index] || Math.floor(80 + Math.random() * GAP_VARIENCE)
        this.scored = false

        this.audio = new Howl({src: [hitObstacle]})

        this.obstacleTop = new PIXI.Sprite(game.textures.obstacleTex)
        this.obstacleBot = new PIXI.Sprite(game.textures.obstacleTex)

        const sprites = [this.obstacleTop, this.obstacleBot]
        
        this.obstacleTop.scale.set(1, -1)
        this.obstacleBot.y = GAP_HEIGHT * game.scale

        this.container = new PIXI.Container()
        this.container.x = this.app.screen.width / 2 + (this.x - player.x) * game.scale
        this.container.y = this.y * game.scale
        this.container.addChild(...sprites)

        this.app.ticker.add(this.update)
    }

    destroy = () => {
        this.app.ticker.remove(this.update)
    }

    resize = () => {
        const { game, player } = store.getState()
        this.obstacleTop.texture = game.textures.obstacleTex
        this.obstacleBot.texture = game.textures.obstacleTex
        this.obstacleBot.y = GAP_HEIGHT * game.scale
        this.container.x = this.app.screen.width / 2 + (this.x - player.x) * game.scale
        this.container.y = this.y * game.scale
    }

    update = (delta) => {
        const { game, player } = store.getState()

        let {dx, dy, alive, score} = player

        const xDiff = this.x - player.x
        const yDiff = this.y - player.y
        
        if (player.alive) {
            // top/bottom
            if (-xDiff >= STROKE_WIDTH
                && -xDiff <= STROKE_WIDTH + OBSTACLE_WIDTH
                && (-yDiff < PLAYER_RADIUS || yDiff + GAP_HEIGHT < PLAYER_RADIUS)) {
                alive = false
            }
            // left (right not possible)
            else if (xDiff < PLAYER_RADIUS && xDiff > -STROKE_WIDTH
                && (yDiff >= STROKE_WIDTH || -yDiff >= GAP_HEIGHT + STROKE_WIDTH)) {
                alive = false
            }
            // top left
            else if (Math.sqrt((xDiff + STROKE_WIDTH)**2 + (yDiff - STROKE_WIDTH)**2) < PLAYER_RADIUS) {
                alive = false
                return
            }
            // top right
            else if (Math.sqrt((xDiff + OBSTACLE_WIDTH + STROKE_WIDTH)**2 + (yDiff - STROKE_WIDTH)**2) < PLAYER_RADIUS) {
                alive = false
            }
            // bottom left
            else if (Math.sqrt((xDiff + STROKE_WIDTH)**2 + (yDiff + GAP_HEIGHT + STROKE_WIDTH)**2) < PLAYER_RADIUS) {
                alive = false
            }
            // bottom right
            else if (Math.sqrt((xDiff + OBSTACLE_WIDTH + STROKE_WIDTH)**2 + (yDiff + GAP_HEIGHT + STROKE_WIDTH)**2) < PLAYER_RADIUS) {
                alive = false
            }
            // kill + sound
            if (!alive) {
                dx = 0
                dy = -6
                this.audio.stop()
                this.audio.play()
            }
        }

        // score
        if (!this.scored && player.x > this.x) {
            this.scored = true
            score += 1
        }

        // update obstacle
        if (xDiff <= -OBSTACLE_DIST - OBSTACLE_WIDTH / 2 - STROKE_WIDTH ) {
            this.scored = false
            this.index = (this.index + 2) % game.obstacles.length
            this.x += 2 * OBSTACLE_DIST
            this.y = game.obstacles[this.index] || Math.floor(80 + Math.random() * GAP_VARIENCE)
            this.container.y = this.y * game.scale
        }

        this.container.x = this.app.screen.width / 2 + xDiff * game.scale

        store.dispatch({
            type: "player",
            payload: {dx, dy, alive, score},
        })

    }
}

export default GameObstacle