import React, { Component } from "react"
import * as PIXI from "pixi.js"
import { withApp, Sprite } from "react-pixi-fiber"
import { connect } from "react-redux"

const GRAVITY = 0.3
const TVELOCITY = 6

const center = new PIXI.Point(0.5, 0.5)

class PlayerSprite extends Component {
    state = {
        frame: 0,
        frameCount: 0,
    }

    wingFrames = [
        this.props.textures.wingTex1,
        this.props.textures.wingTex2,
        this.props.textures.wingTex3,
        this.props.textures.wingTex2,
    ]
    
    animate = (delta) => {
        // animate wings flaping at 12 fps
        if (this.state.frameCount + delta >= 5) {
            this.setState({
                frameCount: this.state.frameCount + delta - 5,
                frame: (this.state.frame + 1) % 4,
            })
        }
        else {
            this.setState({frameCount: this.state.frameCount + delta})
        }
    }
    
    gravity = (delta) => {
        let y = this.props.player.y
        let dy = this.props.player.dy
        
        for (let i = 0; i < delta; i++) {
            y = Math.min(Math.max(y + dy, 17), 463)
            dy = Math.min(dy + GRAVITY, TVELOCITY)
        }
        
        this.props.dispatch({type: "player", payload: {y, dy}})
    }
    
    flap = (e) => {
        if (
            (e instanceof MouseEvent && e.button === 0 && e.target.tagName === "CANVAS") ||
            (e instanceof KeyboardEvent && e.key === " ") ||
            (e instanceof TouchEvent && e.target.tagName === "CANVAS")
            ) {
            this.props.dispatch({type: "player", payload: {dy: -TVELOCITY}})
            e.preventDefault() // does not stop click/highlight because synthetic event queue
        }
    }

    preventClick = (e) => {
        if (e.button === 0 && e.target.tagName === "CANVAS") {
            e.preventDefault()
        }
    }

    componentDidMount() {
        this.props.app.ticker.add(this.animate)
        this.props.app.ticker.add(this.gravity)
        document.addEventListener("keydown", this.flap)
        document.addEventListener("mousedown", this.flap)
        document.addEventListener("touchstart", this.flap)
        document.addEventListener("click", this.preventClick)
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.animate)
        this.props.app.ticker.remove(this.gravity)
        document.removeEventListener("keydown", this.flap)
        document.removeEventListener("mousedown", this.flap)
        document.removeEventListener("touchstart", this.flap)
        document.removeEventListener("click", this.preventClick)
    }

    render() {
        return (
            <>
                <Sprite anchor={center} x={this.props.player.x} y={this.props.player.y} texture={this.props.textures.bodyTex1} tint={this.props.player.mainColor} />
                <Sprite anchor={center} x={this.props.player.x} y={this.props.player.y} texture={this.props.textures.bodyTex2} tint={this.props.player.accentColor} />
                <Sprite anchor={center} x={this.props.player.x} y={this.props.player.y} texture={this.wingFrames[this.state.frame]} tint={this.props.player.accentColor} />
                <Sprite anchor={center} x={this.props.player.x} y={this.props.player.y} texture={this.props.textures.faceTex1} />
                <Sprite anchor={center} x={this.props.player.x} y={this.props.player.y} texture={this.props.textures.bodyTex3} tint={this.props.player.accentColor} />
                {/* <Sprite anchor={center} x={this.props.player.x} y={this.props.player.y} texture={faceTex2} /> */}
            </>
        )
    }
}

export default withApp(connect(({player}) => ({player}))(PlayerSprite))