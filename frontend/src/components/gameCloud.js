import * as PIXI from "pixi.js"

import store from "../utils/store"

class GameCloud {
    constructor(app) {
        this.app = app

        const { game } = store.getState()

        this.x = 320
        this.y = Math.floor(Math.random() * 417)
        
        this.cloud = new PIXI.Sprite(game.textures.cloudTex)

        this.container = new PIXI.Container()
        this.container.x = this.x * game.scale
        this.container.y = this.y * game.scale
        this.container.addChild(this.cloud)

        this.app.ticker.add(this.update)
    }

    destroy = () => {
        this.app.ticker.remove(this.update)
    }

    resize = () => {
        const { game } = store.getState()
        this.cloud.texture = game.textures.cloudTex
        this.container.x = this.x * game.scale
        this.container.y = this.y * game.scale
    }

    update = (delta) => {
        const { game, player } = store.getState()

        this.x -= player.dx / 2

        // update cloud
        if (this.x <= -128) {
            this.x = 320
            this.y = Math.floor(Math.random() * 417)
            this.container.y = this.y * game.scale
        }
        
        this.container.x = this.x * game.scale
    }
}

export default GameCloud