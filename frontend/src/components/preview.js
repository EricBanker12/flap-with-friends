import React from "react"
import { Stage } from "react-pixi-fiber"

import PlayerPreview from "./previewSprite"

const Preview = (props) => {
    return (
        <div style={{width: 64, height: 64, borderRadius: 64, overflow: "hidden"}}>
            <Stage options={{width: 64, height: 64, backgroundColor: 0x75CAEB}}>
                <PlayerPreview {...props} />
            </Stage>
        </div>
    )
}

export default Preview