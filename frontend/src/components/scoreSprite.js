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
    fontSize: 14,
    lineJoin: "round",
    fill: "white",
    stroke: "black",
    strokeThickness: 4,
}

const ScoreSprite = ({player}) => {
    return (
        <>
            <Text x={20} y={20} text={`\u2b24`} style={{...style, fill: player.mainColor}} />
            <Text x={40} y={20} text={player.nickname + "\n" + player.score} style={style} />
        </>
    )
}

export default withApp(connect(({player}) => ({player}))(ScoreSprite))