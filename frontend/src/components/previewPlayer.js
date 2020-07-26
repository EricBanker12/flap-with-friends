import * as PIXI from "pixi.js"

import store from "../utils/store"

const wingFrames = ["wingTex1", "wingTex2", "wingTex3", "wingTex2"]

class PreviewPlayer {
    constructor(app, textures) {
        this.app = app

        this.bodySprite1 = new PIXI.Sprite(textures.bodyTex1)
        this.bodySprite2 = new PIXI.Sprite(textures.bodyTex2)
        this.faceSprite = new PIXI.Sprite(textures.faceTex1)
        
        this.wingSprite = new PIXI.AnimatedSprite(wingFrames.map(key => textures[key]))
        this.wingSprite.animationSpeed = 0.2
        this.wingSprite.play()

        this.color()

        const sprites = [this.bodySprite1, this.bodySprite2, this.wingSprite, this.faceSprite]
        sprites.forEach((sprite) => {sprite.anchor.set(0.5, 0.5)})
        this.container = new PIXI.Container()
        this.container.addChild(...sprites)

        this.unsubscribe = store.subscribe(this.color)
    }

    destroy = () => {
        this.unsubscribe()
    }

    color = () => {
        const {player} = store.getState()
        this.bodySprite1.tint = player.mainColor
        this.bodySprite2.tint = player.accentColor
        this.wingSprite.tint = player.accentColor
    }
}

export default PreviewPlayer