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

    componentDidUpdate(props, state) {
        if (!this.props.hidden && props.hidden) {
            this.init()
        }
        if (this.props.hidden && !props.hidden && state.game) {
            state.game.destroy()
        }
    }

    componentWillUnmount() {
        if (this.state.game) {
            this.state.game.destroy()
        }
    }
    
    render() {
        return (
            <div
                ref={this.ref}
                style={{
                    position: "relative",
                    backgroundColor: "#75CAEB",
                    width: "100%",
                    height: 0,
                    paddingBottom: "150%",
                    overflow: "hidden",
                }}>
                <GameOver reset={this.reset} />
            </div>
        )
    }
}

export default connect()(Game)