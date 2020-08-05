import * as PIXI from "pixi.js"

import store from "../utils/store"

class GameScore {
    constructor(app) {
        this.app = app

        const { game, player, settings } = store.getState()

        this.x = 20
        this.y = 20
        
        const style = {
            fontFamily: [
                "Mali",
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe UI",
                "Roboto",
                "Helvetica Neue",
                "Arial",
                "sans-serif",
                "Apple Color Emoji",
                "Segoe UI Emoji",
                "Segoe UI Symbol"
            ],
            lineJoin: "round",
            fill: "white",
            stroke: "black",
            fontSize: 14 * game.scale,
            strokeThickness: 4 * game.scale,
        }

        this.scoreDot = new PIXI.Text(`\u2b24`, {...style, fill: player.mainColor})
        this.scoreText = new PIXI.Text(`${settings.nickname}\n${player.score}`, style)
        this.scoreText.x = 20 * game.scale

        this.container = new PIXI.Container()
        this.container.x = this.x * game.scale
        this.container.y = this.y * game.scale
        this.container.addChild(this.scoreDot, this.scoreText)

        this.unsubscribe = store.subscribe(this.update)
    }

    destroy = () => {
        this.unsubscribe()
    }

    resize = () => {
        const { game, settings } = store.getState()
        
        const style = {
            fontFamily: [
                "Mali",
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe UI",
                "Roboto",
                "Helvetica Neue",
                "Arial",
                "sans-serif",
                "Apple Color Emoji",
                "Segoe UI Emoji",
                "Segoe UI Symbol"
            ],
            lineJoin: "round",
            fill: "white",
            stroke: "black",
            fontSize: 14 * game.scale,
            strokeThickness: 4 * game.scale,
        }

        this.scoreDot.style = {...style, fill: settings.mainColor}
        this.scoreText.style = style
        this.scoreText.x = 20 * game.scale

        this.container.x = this.x * game.scale
        this.container.y = this.y * game.scale
    }

    update = () => {
        const { player, settings } = store.getState()
        this.scoreText.text = `${settings.nickname}\n${player.score}`
    }
}

export default GameScore