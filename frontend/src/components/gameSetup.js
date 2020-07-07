import React from "react"

const GameSetup = () => {
    return (
        <form>
            <h2>Game Settings</h2>
            <label>
                <span>Rounds: </span>
                <input type='number' name='rounds' min={1} max={20} defaultValue={3} />
            </label>
            <h2>Player Settings</h2>
            <label>
                <span>Nickname: </span>
                <input type='text' name='nickname' />
            </label>
            <label>
                <span>Character Color: </span>
                <input type='color' name='color' />
            </label>
            <button type='button'>Ready</button>
            <button type='submit' disabled>Start</button>
        </form>
    )
}

export default GameSetup