import React, { Component } from "react"
import * as PIXI from "pixi.js"
import { Stage } from "react-pixi-fiber"
import { Provider } from "react-redux"

import Player from "./playerSprite"
import Obstacle from "./obstacleSprite"
import Cloud from "./cloudSprite"
import store from "../utils/store"

import spriteSheet from "../images/spritesheet.svg"

class Game extends Component {
    sprites = PIXI.BaseTexture.from(spriteSheet, {resolution: 1})

    textures = {
        cloudTex: new PIXI.Texture(this.sprites, new PIXI.Rectangle(0, 0, 128, 64)),
        bodyTex1: new PIXI.Texture(this.sprites, new PIXI.Rectangle(0, 65, 34, 34)),
        bodyTex2: new PIXI.Texture(this.sprites, new PIXI.Rectangle(35, 65, 34, 34)),
        bodyTex3: new PIXI.Texture(this.sprites, new PIXI.Rectangle(70, 65, 34, 34)),
        wingTex1: new PIXI.Texture(this.sprites, new PIXI.Rectangle(0, 100, 34, 34)),
        wingTex2: new PIXI.Texture(this.sprites, new PIXI.Rectangle(35, 100, 34, 34)),
        wingTex3: new PIXI.Texture(this.sprites, new PIXI.Rectangle(70, 100, 34, 34)),
        faceTex1: new PIXI.Texture(this.sprites, new PIXI.Rectangle(0, 135, 34, 34)),
        faceTex2: new PIXI.Texture(this.sprites, new PIXI.Rectangle(35, 135, 34, 34)),
        obstacleTex: new PIXI.Texture(this.sprites, new PIXI.Rectangle(0, 169, 66, 400)),
    }
    
    render() {
        return(
            <Stage {...this.props} options={{width: 320, height: 480, backgroundColor: 0x75CAEB}}>
                <Provider store={store}>
                    <Cloud texture={this.textures.cloudTex} />
                    <Obstacle texture={this.textures.obstacleTex} x={480} />
                    <Obstacle texture={this.textures.obstacleTex} x={480 + 127 + 66} />
                    {/* other players */}
                    <Player textures={this.textures} />
                    {/* score overlay */}
                </Provider>
            </Stage>
        )
    }
}

export default Game