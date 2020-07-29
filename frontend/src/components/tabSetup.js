import React from "react"
import { navigate } from "gatsby"
import { connect } from "react-redux"
import Axios from "axios"

import SettingsPlayer from "./settingsPlayer"
import SettingsGame from "./settingsGame"

const TabSetup = ({dispatch, hidden}) => {
    
    const play = async (e) => {
        e.preventDefault()
        try {
            // const res = await Axios.get("http://localhost:8080/api/obstacles")
            const res = await Axios.get("/api/obstacles")
            const obstacles = res.data.obstacles
            if (obstacles) {
                dispatch({
                    type: "game",
                    payload: {obstacles},
                })
            }
            navigate("/play")
        }
        catch (err) {
            navigate("/play")
        }
    }

    return (
        <div role="tabpanel" hidden={hidden}>
            <form onSubmit={play}>
                <SettingsGame />
                <SettingsPlayer hidden={hidden} />
                <div style={{display: "flex", alignItems: "flex-end", height: "3rem"}}>
                    <button
                        className="btn btn-success btn-lg col-12"
                        type="button">
                        Ready
                    </button>
                </div>
                <h2>Player Status</h2>
                <div >
                    <p>To Do</p>
                </div>
                <div style={{display: "flex", alignItems: "flex-end", height: "3rem"}}>
                    <button
                        className="btn btn-primary btn-lg col-12"
                        type="submit">
                        Play
                    </button>
                </div>
            </form>
        </div>
    )
}

export default connect()(TabSetup)