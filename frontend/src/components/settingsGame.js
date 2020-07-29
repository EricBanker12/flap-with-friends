import React from "react"
import { connect } from "react-redux"

const SettingsGame = ({game, dispatch}) => {
    
    const handleGameInput = (e) => {
        const {name, value} = e.currentTarget
        dispatch({
            type: "game",
            payload: {[name]: value}
        })
    }

    return (
        <>
            <h2>Game Settings</h2>
            <label>
                <span>Rounds: </span>
                <input
                    className="form-control"
                    type='number'
                    name='rounds'
                    min={1}
                    max={20}
                    defaultValue={game.rounds}
                    onChange={handleGameInput}
                />
            </label>
        </>
    )
}

export default connect(({game}) => ({game}))(SettingsGame)