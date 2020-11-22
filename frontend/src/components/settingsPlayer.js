import React from "react"
import { connect } from "react-redux"
import loadable from "@loadable/component"

import InputColor from "./inputColor"

const Preview = loadable(() => import("./preview"))

const SettingsPlayer = ({settings, dispatch}) => {

    const handlePlayerInput = (e) => {
        const {name, value} = e.currentTarget
        dispatch({
            type: "settings",
            payload: {
                [name]: value,
                ready: false,
            }
        })
    }

    return (
        <>
            <h2>Player Settings</h2>
            <div className="row m-0">
                <div className="col-6 px-0 d-flex flex-column align-items-start">
                    <label className="d-flex w-100 align-items-sm-center flex-column flex-sm-row">
                        <span>Name:&nbsp;</span>
                        <input
                            className="form-control mr-2"
                            type='text'
                            name='nickname'
                            required
                            defaultValue={settings.nickname}
                            onChange={handlePlayerInput}
                        />
                    </label>
                    <div className="d-flex w-100 flex-column flex-sm-row">
                        <InputColor label="Main Color: " name="mainColor" />
                        <InputColor label="Accent Color: " name="accentColor" />
                    </div>
                </div>
                <div className="col-6 px-0 d-flex justify-content-center align-items-center">
                    <Preview />
                </div>
            </div>
        </>
    )
}

export default connect(({settings}) => ({settings}))(SettingsPlayer)