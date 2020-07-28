import * as PIXI from "pixi.js"
import { debounce } from "lodash-core"

import GamePlayer from "./gamePlayer"
import GameObstacle from "./gameObstacle"
import GameCloud from "./gameCloud"
import GameScore from "./gameScore"

import store from "../utils/store"

import spriteSheet from "../images/spritesheet.svg"

const WIDTH = 320
const HEIGHT = 480

class GameApplication {
    constructor() {
        this.app = new PIXI.Application({
            width: WIDTH,
            height: HEIGHT,
            backgroundColor: 0x75CAEB,
        })
        
        this.resize()

        this.player = new GamePlayer(this.app)
        this.obstacleA = new GameObstacle(this.app, 0)
        this.obstacleB = new GameObstacle(this.app, 1)
        this.cloud = new GameCloud(this.app)
        this.score = new GameScore(this.app)

        this.gameObjects = [this.cloud, this.obstacleA, this.obstacleB, this.player, this.score]
        this.app.stage.addChild(...this.gameObjects.map(obj => obj.container))

        window.addEventListener("resize", this.resizeHandler)
    }

    destroy = () => {
        window.removeEventListener("resize", this.resizeHandler)
        this.gameObjects.forEach((obj) => {obj.destroy()})
        this.app.destroy(true, true)
    }
    
    resize = () => {
        let width = Math.min(800, window.innerWidth)
        let height = window.innerHeight
        if (width > 576) {
            height -= 124
        }

        const scaleX = width / WIDTH
        const scaleY = height / HEIGHT
        const scale = Math.min(scaleX, scaleY)

        this.app.renderer.resize(WIDTH * scale, HEIGHT * scale)

        const { game } = store.getState()
        
        if (game.baseTexture) {
            Object.keys(game.textures).forEach((key) => {
                game.textures[key].destroy()
            })
            game.baseTexture.destroy()
        }

        const baseTexture = new PIXI.BaseTexture(new PIXI.resources.SVGResource(spriteSheet, {scale}))
        const textures = {
            cloudTex: new PIXI.Texture(baseTexture, new PIXI.Rectangle(0 * scale, 0 * scale, 128 * scale, 64 * scale)),
            bodyTex1: new PIXI.Texture(baseTexture, new PIXI.Rectangle(0 * scale, 65 * scale, 34 * scale, 34 * scale)),
            bodyTex2: new PIXI.Texture(baseTexture, new PIXI.Rectangle(35 * scale, 65 * scale, 34 * scale, 34 * scale)),
            wingTex1: new PIXI.Texture(baseTexture, new PIXI.Rectangle(0 * scale, 100 * scale, 34 * scale, 34 * scale)),
            wingTex2: new PIXI.Texture(baseTexture, new PIXI.Rectangle(35 * scale, 100 * scale, 34 * scale, 34 * scale)),
            wingTex3: new PIXI.Texture(baseTexture, new PIXI.Rectangle(70 * scale, 100 * scale, 34 * scale, 34 * scale)),
            faceTex1: new PIXI.Texture(baseTexture, new PIXI.Rectangle(0 * scale, 135 * scale, 34 * scale, 34 * scale)),
            faceTex2: new PIXI.Texture(baseTexture, new PIXI.Rectangle(35 * scale, 135 * scale, 34 * scale, 34 * scale)),
            obstacleTex: new PIXI.Texture(baseTexture, new PIXI.Rectangle(0 * scale, 170 * scale, 66 * scale, 300 * scale)),
        }

        store.dispatch({
            type: "game",
            payload: {scale, baseTexture, textures}
        })

        if (this.gameObjects) {
            this.gameObjects.forEach((obj) => {obj.resize()})
        }
    }

    resizeHandler = debounce(this.resize, 100)
}

export default GameApplication