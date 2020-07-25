import * as PIXI from "pixi.js"

import PreviewPlayer from "./previewPlayer"

import spriteSheet from "../images/spritesheet.svg"

class PreviewApplication {
    constructor() {
        this.app = new PIXI.Application({
            width: 34,
            height: 34,
            backgroundColor: 0x75CAEB,
        })

        const sprites = PIXI.BaseTexture.from(spriteSheet, {resolution: 1})
        const textures = {
            bodyTex1: new PIXI.Texture(sprites, new PIXI.Rectangle(0, 65, 34, 34)),
            bodyTex2: new PIXI.Texture(sprites, new PIXI.Rectangle(35, 65, 34, 34)),
            bodyTex3: new PIXI.Texture(sprites, new PIXI.Rectangle(70, 65, 34, 34)),
            wingTex1: new PIXI.Texture(sprites, new PIXI.Rectangle(0, 100, 34, 34)),
            wingTex2: new PIXI.Texture(sprites, new PIXI.Rectangle(35, 100, 34, 34)),
            wingTex3: new PIXI.Texture(sprites, new PIXI.Rectangle(70, 100, 34, 34)),
            faceTex1: new PIXI.Texture(sprites, new PIXI.Rectangle(0, 135, 34, 34)),
        }

        this.player = new PreviewPlayer(this.app, textures)
        this.player.container.x = this.app.screen.width / 2
        this.player.container.y = this.app.screen.height / 2
        this.app.stage.addChild(this.player.container)
    }

    destroy = () => {
        this.player.destroy()
        this.app.destroy(true, true)
    }
}

export default PreviewApplication