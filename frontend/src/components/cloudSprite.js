import React, { Component } from "react"
import { Sprite, withApp } from "react-pixi-fiber"
import { connect } from "react-redux"

class CloudSprite extends Component {
    state = {
        x: 320,
        y: Math.floor(Math.random() * 417),
    }

    update = (delta) => {
        let {x, y} = this.state
        
        // move
        x -= (this.props.player.dx / 2) * delta
        
        // new cloud
        if (x <= -128) {
            x = 320
            y = Math.floor(Math.random() * 417)
        }

        this.setState({x, y})
    }

    componentDidMount() {
        this.props.app.ticker.add(this.update)
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.update)
    }
    
    render() {
        return (
            <Sprite
                x={this.state.x  * this.props.game.scale}
                y={this.state.y  * this.props.game.scale}
                texture={this.props.texture}
            />
        )
    }
}

export default withApp(connect(({game, player}) => ({game, player}))(CloudSprite))