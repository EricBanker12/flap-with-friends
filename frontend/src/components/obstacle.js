import React, { Component } from "react"
import * as PIXI from "pixi.js"
import { withApp, Sprite } from "react-pixi-fiber"

const flip = new PIXI.Point(1, -1)
const center = new PIXI.Point(0.5, 0)

class Obstacle extends Component {
    state = {
        x: 480,
        y: 176,
        dx: 2,
    }

    update = (delta) => {
        const x = this.state.x - this.state.dx * delta
        if (x > -33) this.setState({x})
        else {
            this.setState({x: 353, y: 80 + Math.floor(Math.random() * 198)})
        }
    }

    componentDidMount() {
        this.props.app.ticker.add(this.update)
        if (this.props.x) {
            this.setState({x: this.props.x})
        }
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.update)
    }
    
    render() {
        return (
            <>
                <Sprite x={this.state.x} y={this.state.y} anchor={center} scale={flip} texture={this.props.texture} />
                <Sprite x={this.state.x} y={this.state.y + 123} anchor={center} texture={this.props.texture} />
            </>
        )
    }
}

export default withApp(Obstacle)