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
            <h2 className="mt-1">Player Settings</h2>
            <div className="row m-0">
                <div className="col-6 px-0 d-flex flex-column align-items-start">
                    <label className="d-flex w-100 align-items-center justify-content-start flex-wrap flex-sm-nowrap">
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
                    <InputColor label="Main Color: " name="mainColor" />
                    <InputColor label="Accent Color: " name="accentColor" />
                </div>
                <div className="col-6 px-0 d-flex justify-content-center align-items-center">
                    <Preview />
                </div>
            </div>
        </>
    )
}

export default connect(({settings}) => ({settings}))(SettingsPlayer)