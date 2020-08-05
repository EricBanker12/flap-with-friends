import React from "react"
import { connect } from "react-redux"

const SettingsGame = ({settings, dispatch}) => {
    
    const handleGameInput = (e) => {
        const {name, value} = e.currentTarget
        dispatch({
            type: "settings",
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
                    defaultValue={settings.rounds}
                    onChange={handleGameInput}
                />
            </label>
        </>
    )
}

export default connect(({settings}) => ({settings}))(SettingsGame)