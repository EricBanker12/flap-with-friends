import React from "react"
import { navigate } from "gatsby"
import { connect } from "react-redux"
import Axios from "axios"

import SettingsPlayer from "./settingsPlayer"
import SettingsGame from "./settingsGame"

const TabSetup = ({game, dispatch, tab}) => {
    
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
        <div role="tabpanel" hidden={game.tab !== tab}>
            <form onSubmit={play}>
                <SettingsGame />
                <SettingsPlayer hidden={game.tab !== tab} />
                <button
                    className="btn btn-success btn-lg w-100"
                    type="button">
                    Ready
                </button>
                <h2>Player Status</h2>
                <div >
                    <p>To Do</p>
                </div>
                <button
                    className="btn btn-primary btn-lg w-100"
                    type="submit">
                    Play
                </button>
            </form>
        </div>
    )
}

export default connect(({game}) => ({game}))(TabSetup)