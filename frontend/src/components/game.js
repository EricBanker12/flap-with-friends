import React, { Component, createRef } from "react"
import * as PIXI from "pixi.js"
import { Stage } from "react-pixi-fiber"
import { Provider, connect } from "react-redux"

import Player from "./playerSprite"
import Obstacle from "./obstacleSprite"
import Cloud from "./cloudSprite"
import Score from "./scoreSprite"

import store from "../utils/store"

import spriteSheet from "../images/spritesheet.svg"

class Game extends Component {
    state = {
        sprites: {},
        textures: {},
        loaded: false,
    }

    audio = createRef()

    resize = () => {
        const scaleX = Math.min(800, window.innerWidth) / 320
        const scaleY = window.innerHeight / 480
        const scale = Math.min(scaleX, scaleY)
        
        if (!this.state.loaded || this.props.game.scale !== scale) {
            PIXI.utils.clearTextureCache()
            const sprites = new PIXI.BaseTexture(new PIXI.resources.SVGResource(spriteSheet, {scale: scale}))
            const textures = {
                cloudTex: new PIXI.Texture(sprites, new PIXI.Rectangle(0 * scale, 0 * scale, 128 * scale, 64 * scale)),
                bodyTex1: new PIXI.Texture(sprites, new PIXI.Rectangle(0 * scale, 65 * scale, 34 * scale, 34 * scale)),
                bodyTex2: new PIXI.Texture(sprites, new PIXI.Rectangle(35 * scale, 65 * scale, 34 * scale, 34 * scale)),
                bodyTex3: new PIXI.Texture(sprites, new PIXI.Rectangle(70 * scale, 65 * scale, 34 * scale, 34 * scale)),
                wingTex1: new PIXI.Texture(sprites, new PIXI.Rectangle(0 * scale, 100 * scale, 34 * scale, 34 * scale)),
                wingTex2: new PIXI.Texture(sprites, new PIXI.Rectangle(35 * scale, 100 * scale, 34 * scale, 34 * scale)),
                wingTex3: new PIXI.Texture(sprites, new PIXI.Rectangle(70 * scale, 100 * scale, 34 * scale, 34 * scale)),
                faceTex1: new PIXI.Texture(sprites, new PIXI.Rectangle(0 * scale, 135 * scale, 34 * scale, 34 * scale)),
                faceTex2: new PIXI.Texture(sprites, new PIXI.Rectangle(35 * scale, 135 * scale, 34 * scale, 34 * scale)),
                obstacleTex: new PIXI.Texture(sprites, new PIXI.Rectangle(0 * scale, 169 * scale, 66 * scale, 300 * scale)),
            }

            this.props.dispatch({
                type: "game",
                payload: {scale},
            })

            this.setState({
                sprites,
                textures,
                loaded: true,
            })
        }
    }

    componentDidMount() {
        this.resize()
        window.addEventListener("resize", this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize)
    }
    
    render() {
        if (!this.state.loaded) {
            return <div>Loading...</div>
        }
        
        return (
            <>
                <audio ref={this.audio} />
                <Stage options={{width: 320*this.props.game.scale, height: 480*this.props.game.scale, backgroundColor: 0x75CAEB}}>
                    <Provider store={store}>
                        <Cloud texture={this.state.textures.cloudTex} />
                        <Obstacle
                            texture={this.state.textures.obstacleTex}
                            audio={this.audio}
                            x={480}
                        />
                        <Obstacle
                            texture={this.state.textures.obstacleTex}
                            audio={this.audio}
                            x={673}
                        />
                        {/* other players */}
                        <Player
                            textures={this.state.textures}
                            audio={this.audio}
                        />
                        <Score />
                    </Provider>
                </Stage>
            </>
        )
    }
}

export default connect(({game}) => ({game}))(Game)