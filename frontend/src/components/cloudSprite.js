import React from "react"
import { Sprite } from "react-pixi-fiber"
import { connect } from "react-redux"

const CloudSprite = ({game, texture}) => {
    return <Sprite texture={texture} />
}

export default connect(({game}) => ({game}))(CloudSprite)