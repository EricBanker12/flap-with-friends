import React, { useEffect } from "react"
import { connect } from "react-redux"
import { navigate } from "gatsby"

const GameOver = ({game, player, reset, dispatch}) => {
    useEffect(() => {
        if (!player.alive && player.score > player.highScore) {
            dispatch({
                type: "player",
                payload: {highScore: player.score},
            })
        }
    }, [player, dispatch])

    return (
        <div
            hidden={player.alive || player.y < 463}
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
                <h2>Score: {player.score}</h2>
                <h2>High Score: {player.highScore}</h2>
                <button
                    className="btn btn-primary btn-lg mx-4"
                    onClick={reset}>
                    Restart
                </button>
                <button
                    className="btn btn-primary btn-lg mx-4"
                    onClick={() => {navigate("/")}}>
                    Setup
                </button>
            </div>
        </div>
    )
}

export default connect(({game, player}) => ({game, player}))(GameOver)