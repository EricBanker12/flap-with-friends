import React from "react"
import { Text, withApp } from "react-pixi-fiber"
import { connect } from "react-redux"

const style = {
    fontFamily: [
        "Mali",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol"
    ],
    lineJoin: "round",
    fill: "white",
    stroke: "black",
}

const ScoreSprite = ({game, player}) => {
    return (
        <>
            <Text
                x={20*game.scale}
                y={20*game.scale}
                text={`\u2b24`}
                style={{
                    ...style,
                    fill: player.mainColor,
                    fontSize: 14 * game.scale,
                    strokeThickness: 4 * game.scale,
                }}
            />
            <Text
                x={40*game.scale}
                y={20*game.scale}
                text={player.nickname + "\n" + player.score}
                style={{
                    ...style,
                    fontSize: 14 * game.scale,
                    strokeThickness: 4 * game.scale,
                }}
            />
        </>
    )
}

export default withApp(connect(({game, player}) => ({game, player}))(ScoreSprite))