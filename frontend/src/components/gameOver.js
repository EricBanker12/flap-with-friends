import React, { useEffect, useRef } from "react"
import { connect } from "react-redux"

import { SETUP } from "../utils/constants"

const GameOver = ({game, ui, reset, dispatch}) => {
    const resetButton = useRef()

    const setupHandler = () => {
        dispatch({
            type: "ui",
            payload: {
                tab: SETUP,
                playing: false,
                gameOver: false,
            }
        })
    }

    useEffect(() => {
        if (ui.gameOver) {
            setTimeout(() => {
                resetButton.current.focus()
            }, 0)
        }
    }, [ui])

    return (
        <div
            hidden={!ui.gameOver}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "stretch",
                width: 320,
                height: 240,
                position: "absolute",
                zIndex: 1,
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(${game.scale}, ${game.scale})`,
                background: "rgba(255,255,255,0.95)",
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "stretch",
                    textAlign: "center",
                    height: "12rem",
                }}>
                <h2>Score: {ui.score}</h2>
                <h2>High Score: {ui.highScore}</h2>
                <button
                    className="btn btn-primary btn-lg mx-4"
                    onClick={reset}
                    ref={resetButton}>
                    Restart
                </button>
                <button
                    className="btn btn-primary btn-lg mx-4"
                    onClick={setupHandler}>
                    Setup
                </button>
            </div>
        </div>
    )
}

export default connect(({game, ui}) => ({game, ui}))(GameOver)