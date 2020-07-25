import * as PIXI from "pixi.js"

import store from "../utils/store"

import hitObstacle from "../audio/hit_obstacle.mp3"

const GAP_HEIGHT = 125
const OBSTACLE_DIST = 193

class GameObstacle {
    constructor(app, index) {
        this.app = app
        this.index = index

        const { game, player } = store.getState()

        this.x = OBSTACLE_DIST * index
        this.y = game.obstacles[index] || Math.floor(80 + Math.random() * 196)
        this.scored = false

        this.audio = document.createElement("audio")
        this.audio.src = hitObstacle

        this.obstacleTop = new PIXI.Sprite(game.textures.obstacleTex)
        this.obstacleBot = new PIXI.Sprite(game.textures.obstacleTex)

        const sprites = [this.obstacleTop, this.obstacleBot]
        sprites.forEach((sprite) => {sprite.anchor.set(0.5, 0)})
        
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
        this.container.x = this.app.screen.width / 2 + (this.x - player.x) * game.scale
        this.container.y = this.y * game.scale
    }

    update = (delta) => {
        const { game, player } = store.getState()

        let {dx, alive, score} = player

        if (player.alive) {
            const diffX = Math.abs(this.x - player.x)
            // top/bottom
            if (diffX < 32 && (player.y < this.y + 15 || player.y > this.y + GAP_HEIGHT - 15)) {
                alive = false
            }
            // left/right
            else if (diffX < 48 && (player.y < this.y - 2 || player.y > this.y + GAP_HEIGHT + 2)) {
                alive = false
            }
            // top left
            else if (Math.sqrt((player.x - this.x + 31)**2 + (player.y - this.y + 2)**2) < 16) {
                alive = false
            }
            // top right
            else if (Math.sqrt((player.x - this.x - 31)**2 + (player.y - this.y + 2)**2) < 16) {
                alive = false
            }
            // bottom left
            else if (Math.sqrt((player.x - this.x + 31)**2 + (player.y - this.y - GAP_HEIGHT - 2)**2) < 16) {
                alive = false
            }
            // bottom right
            else if (Math.sqrt((player.x - this.x - 31)**2 + (player.y - this.y - GAP_HEIGHT - 2)**2) < 16) {
                alive = false
            }
            // kill + sound
            if (!alive) {
                dx = 0
                this.audio.pause()
                this.audio.currentTime = 0
                this.audio.play()
            }
        }

        // score
        if (!this.scored && player.x > this.x) {
            this.scored = true
            score += 1
        }

        // update obstacle
        if (this.x - player.x <= -OBSTACLE_DIST) {
            this.scored = false
            this.index = (this.index + 2) % game.obstacles.length
            this.x += 2 * OBSTACLE_DIST
            this.y = game.obstacles[this.index] || Math.floor(80 + Math.random() * 196)
            this.container.y = this.y * game.scale
        }

        this.container.x = this.app.screen.width / 2 + (this.x - player.x) * game.scale

        store.dispatch({
            type: "player",
            payload: {dx, alive, score},
        })

    }
}

export default GameObstacle