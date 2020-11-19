import React from "react"
import { connect } from "react-redux"
import Axios from "axios"

import SettingsPlayer from "./settingsPlayer"
import InviteLink from "./inviteLink"

import { GAME, CHAT } from "../utils/constants"

const TabSetup = ({settings, ui, dispatch, tab}) => {

    if (ui.tab !== tab) {
        return null
    }

    const ready = (e) => {
        dispatch({
            type: "settings",
            payload: {ready: !settings.ready}
        })
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
            <InviteLink/>
            <form onSubmit={play}>
                <SettingsPlayer />
                <div className="d-flex w-100">
                    <button
                        className={`btn btn-${settings.ready ? "success" : "primary"} btn-lg flex-grow-1 mr-4`}
                        type="button"
                        onClick={ready}>
                        Ready
                    </button>
                    <a
                        className="btn btn-primary btn-lg flex-grow-1"
                        href={`#${CHAT}`}>
                        Chat
                    </a>
                </div>
                <h2 className="mt-1">Player Status</h2>
                <div >
                    <p>To Do</p>
                </div>
            </form>
        </div>
    )
}

export default connect(({settings, ui}) => ({settings, ui}))(TabSetup)