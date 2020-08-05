import React, { Component, createRef } from "react"
import { connect } from "react-redux"

import GameApplication from "./gameApplication"
import GameOver from "./gameOver"

class Game extends Component {
    state = {game: null}
    ref = createRef()

    init = () => {
        this.props.dispatch({
            type: "ui",
            payload: {
                gameOver: false,
            }
        })

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

        const game = new GameApplication()
        const deviceScale = 1/(devicePixelRatio || 1)
        game.app.view.style = `transform: scale3d(${deviceScale}, ${deviceScale}, 1); transform-origin: 0 0 0;`
        this.ref.current.appendChild(game.app.view)
        setTimeout(() => {game.resize()}, 0)
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
        if (this.state.game) {
            this.state.game.destroy()
        }
    }
    
    render() {
        return (
            <div
                style={{
                    backgroundColor: "#75CAEB",
                    width: "min(100%, 67vh)",
                    margin: "0 auto",
                    overflow: "hidden",
                }}>
                    <div
                        ref={this.ref}
                        style={{
                            position: "relative",
                            height: 0,
                            paddingBottom: "150%",
                        }}>

                        <GameOver reset={this.reset} />
                    </div>
            </div>
        )
    }
}

export default connect()(Game)