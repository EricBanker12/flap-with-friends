import * as PIXI from "pixi.js"
import { throttle } from "lodash"

import store from "../utils/store"

import playerFlap from "../audio/player_flap.mp3"

const wingFrames = ["wingTex1", "wingTex2", "wingTex3", "wingTex2"]

const TVELOCITY = 6
const GRAVITY = 0.3

class GamePlayer {
    constructor(app) {
        this.app = app

        this.audio = document.createElement("audio")
        this.audio.src = playerFlap

        this.frame = 0
        this.frameCount = 0

        const { game, player } = store.getState()

        this.bodySprite1 = new PIXI.Sprite(game.textures.bodyTex1)
        this.bodySprite2 = new PIXI.Sprite(game.textures.bodyTex2)
        this.wingSprite = new PIXI.Sprite(game.textures[wingFrames[this.frame]])
        this.faceSprite1 = new PIXI.Sprite(game.textures.faceTex1)
        this.bodySprite3 = new PIXI.Sprite(game.textures.bodyTex3)
        this.faceSprite2 = new PIXI.Sprite(game.textures.faceTex2)

        this.bodySprite1.tint = player.mainColor
        this.bodySprite2.tint = player.accentColor
        this.wingSprite.tint = player.accentColor
        this.bodySprite3.tint = player.accentColor

        const sprites = [this.bodySprite1, this.bodySprite2, this.wingSprite, this.faceSprite1, this.bodySprite3]
        sprites.forEach((sprite) => {sprite.anchor.set(0.5, 0.5)})

        this.container = new PIXI.Container()
        this.container.x = this.app.screen.width / 2
        this.container.y = player.y * game.scale
        this.container.addChild(...sprites)

        this.app.ticker.add(this.update)
        window.addEventListener("keydown", this.flap)
        this.app.view.addEventListener("mousedown", this.flap)
        this.app.view.addEventListener("touchstart", this.flap)
    }

    destroy = () => {
        this.app.ticker.remove(this.update)
        window.removeEventListener ("keydown", this.flap)
        this.app.view.removeEventListener("mousedown", this.flap)
        this.app.view.removeEventListener("touchstart", this.flap)
    }

    resize = () => {
        const { game, player } = store.getState()
        this.bodySprite1.texture = game.textures.bodyTex1
        this.bodySprite2.texture = game.textures.bodyTex2
        this.wingSprite.texture = game.textures[wingFrames[this.frame]]
        this.faceSprite1.texture = game.textures.faceTex1
        this.bodySprite3.texture = game.textures.bodyTex3
        this.faceSprite2.texture = game.textures.faceTex2
        this.container.x = this.app.screen.width / 2
        this.container.y = player.y * game.scale
    }

    flap = throttle((e) => {
        const { player } = store.getState()
        if (player.alive) {
            if (!(e instanceof KeyboardEvent) || e.key === " ") {
                e.preventDefault()
                this.audio.pause()
                this.audio.currentTime = 0
                this.audio.play()
                store.dispatch({
                    type: "player",
                    payload: {dy: -TVELOCITY},
                })
            }
        }
    }, 100)

    update = (delta) => {
        const { game, player } = store.getState()
        
        this.animate(delta, game)
        
        let {x, dx, y, dy} = player
        
        // gravity
        y = Math.min(Math.max(y + dy * delta, 17), 463)
        dy = Math.min(dy + delta * GRAVITY, TVELOCITY)
        this.container.y = y * game.scale

        x += dx * delta

        store.dispatch({
            type: "player",
            payload: {x, y, dy},
        })
        
    }

    animate = (delta, game) => {
        // animate wings flaping
        const targetFrames = 5 // 1000ms/s / 12frames/s / 16.66ms
        if (this.frameCount + delta >= targetFrames) {
            this.frame = (this.frame + 1) % wingFrames.length
            this.wingSprite.texture = game.textures[wingFrames[this.frame]]
            this.frameCount += delta - targetFrames
        }
        else {
            this.frameCount += delta
        }
    }
}

export default GamePlayer