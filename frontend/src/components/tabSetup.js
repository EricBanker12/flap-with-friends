import React from "react"
import { connect } from "react-redux"
import Axios from "axios"

import SettingsPlayer from "./settingsPlayer"

import { GAME } from "../utils/constants"

const TabSetup = ({ui, dispatch, tab}) => {

    if (ui.tab !== tab) {
        return null
    }
    
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
        }
        catch (err) {
            console.log("Cannot reach backend, locally generating random obstacles instead.")
        }
        finally {
            window.location.hash=GAME
            dispatch({
                type: "ui",
                payload: {
                    tab: GAME,
                    playing: true,
                    gameOver: false,
                }
            })
        }
    }

    return (
        <div>
            <form onSubmit={play}>
                <SettingsPlayer />
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

export default connect(({ui}) => ({ui}))(TabSetup)