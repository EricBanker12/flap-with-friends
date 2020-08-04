import * as PIXI from "pixi.js"
import { throttle } from "lodash-core"

import store from "../utils/store"

import playerFlap from "../audio/player_flap.mp3"
import { Howl } from "howler"

const wingFrames = ["wingTex1", "wingTex2", "wingTex3", "wingTex2"]

const TVELOCITY = 6
const GRAVITY = 0.3

class GamePlayer {
    constructor(app) {
        this.app = app

        this.audio = new Howl({src: [playerFlap]})

        this.alive = true

        const { game, player } = store.getState()

        this.bodySprite1 = new PIXI.Sprite(game.textures.bodyTex1)
        this.bodySprite2 = new PIXI.Sprite(game.textures.bodyTex2)
        this.faceSprite1 = new PIXI.Sprite(game.textures.faceTex1)
        this.faceSprite2 = new PIXI.Sprite(game.textures.faceTex2)
        
        this.wingSprite = new PIXI.AnimatedSprite(wingFrames.map(key => game.textures[key]))
        this.wingSprite.animationSpeed = 0.2
        this.wingSprite.play()

        this.bodySprite1.tint = player.mainColor
        this.bodySprite2.tint = player.accentColor
        this.wingSprite.tint = player.accentColor

        const sprites = [this.bodySprite1, this.bodySprite2, this.wingSprite, this.faceSprite1, this.faceSprite2]
        sprites.forEach((sprite) => {sprite.anchor.set(0.5, 0.5)})
        sprites.pop() // remove faceSprite2

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
        this.faceSprite1.texture = game.textures.faceTex1
        this.faceSprite2.texture = game.textures.faceTex2

        this.wingSprite.textures = wingFrames.map(key => game.textures[key])
        this.wingSprite.play()

        this.container.x = this.app.screen.width / 2
        this.container.y = player.y * game.scale
    }

    flap = throttle((e) => {
        const { player } = store.getState()
        if (player.alive) {
            if ((e instanceof KeyboardEvent && e.key === " ")
                || (e instanceof MouseEvent && e.button === 0)
                || e instanceof TouchEvent) {
                e.preventDefault()
                this.audio.stop()
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
        
        let {x, dx, y, dy} = player
        
        // gravity
        y = Math.min(Math.max(y + dy * delta, 17), 463)
        dy = Math.min(dy + delta * GRAVITY, TVELOCITY)
        this.container.y = y * game.scale

        x += dx * delta

        if (this.alive && !player.alive) {
            this.alive = false
            this.container.addChild(this.faceSprite2)
            this.wingSprite.stop()
        }

        if (!this.alive && player.alive) {
            this.alive = true
            this.container.removeChild(this.faceSprite2)
            this.wingSprite.play()
        }

        store.dispatch({
            type: "player",
            payload: {x, y, dy},
        })
        
    }
}

export default GamePlayer