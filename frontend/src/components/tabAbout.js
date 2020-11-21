import React from "react"
import { connect } from "react-redux"
import { ABOUT } from "../utils/constants"

const TabAbout = ({ ui }) => {

    if (!RegExp(ABOUT).test(ui.tab)) {
        return null
    }

    return (
        <div className="mt-1">
            <h2>What's This?</h2>
            <p>This is a remake of Dong Nguyen's Flappy Bird, the video game, with added multiplayer to compete with friends.</p>
            <p><small>Multiplayer is not yet implemented.</small></p>
            <h2>How to Play</h2>
            <ul>
                <li>Tap the screen or hit spacebar to flap upwards.</li>
                <li>Wait for gravity to fall downwards.</li>
                <li>Avoid obstacles and stay in flight the longest to win!</li>
            </ul>
        </div>
    )
}

export default connect(({ui}) => ({ui}))(TabAbout)