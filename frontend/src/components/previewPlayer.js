import * as PIXI from "pixi.js"

import store from "../utils/store"

const wingFrames = ["wingTex1", "wingTex2", "wingTex3", "wingTex2"]

class PreviewPlayer {
    constructor(app, textures) {
        this.app = app
        this.textures = textures

        this.frame = 0
        this.frameCount = 0

        this.bodySprite1 = new PIXI.Sprite(this.textures.bodyTex1)
        this.bodySprite2 = new PIXI.Sprite(this.textures.bodyTex2)
        this.wingSprite = new PIXI.Sprite(this.textures[wingFrames[this.frame]])
        this.faceSprite = new PIXI.Sprite(this.textures.faceTex1)
        this.bodySprite3 = new PIXI.Sprite(this.textures.bodyTex3)

        this.color()

        this.sprites = [this.bodySprite1, this.bodySprite2, this.wingSprite, this.faceSprite, this.bodySprite3]
        this.sprites.forEach((sprite) => {sprite.anchor.set(0.5, 0.5)})
        this.container = new PIXI.Container()
        this.container.addChild(...this.sprites)

        this.time = Date.now()
        this.app.ticker.add(this.animate)
        this.unsubscribe = store.subscribe(this.color)
    }

    destroy = () => {
        this.app.ticker.remove(this.animate)
        this.unsubscribe()
    }

    color = () => {
        const {player} = store.getState()
        this.bodySprite1.tint = player.mainColor
        this.bodySprite2.tint = player.accentColor
        this.wingSprite.tint = player.accentColor
        this.bodySprite3.tint = player.accentColor
    }

    animate = (delta) => {
        // animate wings flaping
        const targetFrames = 5 // 1000ms/s / 12frames/s / 16.66ms
        if (this.frameCount + delta >= targetFrames) {
            this.frame = (this.frame + 1) % wingFrames.length
            this.wingSprite.texture = this.textures[wingFrames[this.frame]]
            this.frameCount += delta - targetFrames
        }
        else {
            this.frameCount += delta
        }
    }
}

export default PreviewPlayer