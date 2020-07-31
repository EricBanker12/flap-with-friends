import React, { Component, createRef } from "react"
import { connect } from "react-redux"

import GameApplication from "./gameApplication"
import GameOver from "./gameOver"

class Game extends Component {
    state = {game: null}
    ref = createRef()

    init = () => {
        this.props.dispatch({
            type: "player",
            payload: {
                alive: true,
                score: 0,
                x: -360,
                dx: 2,
                y: 0,
                dy: 0,
            },
        })

        const game = new GameApplication(this.ref.current)
        this.ref.current.appendChild(game.app.view)
        this.setState({game})
    }

    reset = () => {
        this.state.game.destroy()
        this.init()
    }

    componentDidMount() {
        this.init()
    }

    componentWillUnmount() {
        this.state.game.destroy()
    }
    
    render() {
        return (
            <div ref={this.ref} style={{position: "relative", height: 0, paddingBottom: "150%", backgroundColor: "#75CAEB"}}>
                <GameOver reset={this.reset} />
            </div>
        )
    }
}

export default connect()(Game)