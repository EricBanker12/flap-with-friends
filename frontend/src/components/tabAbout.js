import React from "react"

const TabAbout = ({ hidden }) => {
    return (
        <div role="tabpanel" hidden={hidden || false}>
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

export default TabAbout