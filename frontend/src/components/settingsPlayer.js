import React from "react"
import { connect } from "react-redux"
import loadable from "@loadable/component"

import InputColor from "./inputColor"

const Preview = loadable(() => import("./preview"))

const SettingsPlayer = ({hidden, player, dispatch}) => {

    const handlePlayerInput = (e) => {
        const {name, value} = e.currentTarget
        dispatch({
            type: "player",
            payload: {[name]: value}
        })
    }

    return (
        <>
            <h2>Player Settings</h2>
            <div className="row m-0">
                <div className="col-6 px-0">
                    <label>
                        <span>Nickname: </span>
                        <input
                            className="form-control"
                            type='text'
                            name='nickname'
                            required
                            defaultValue={player.nickname}
                            onChange={handlePlayerInput}
                        />
                    </label>
                    <InputColor label="Main Color: " name="mainColor" />
                    <InputColor label="Accent Color: " name="accentColor" />
                </div>
                <div className="col-6 px-0 d-flex justify-content-center align-items-center">
                    {!hidden && <Preview />}
                </div>
            </div>
        </>
    )
}

export default connect(({player}) => ({player}))(SettingsPlayer)