import React from "react"
import { connect } from "react-redux"
import Axios from "axios"

import SettingsPlayer from "./settingsPlayer"
import InviteLink from "./inviteLink"

import { GAME, CHAT } from "../utils/constants"

const TabSetup = ({settings, ui, dispatch}) => {
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
        <main className="mt-1 px-4">
            <InviteLink/>
            <form onSubmit={play}>
                <SettingsPlayer />
                <div className="d-flex w-100 my-2">
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
                <h2>Player Status</h2>
                <div >
                    <p>To Do</p>
                </div>
            </form>
        </main>
    )
}

export default connect(({settings, ui}) => ({settings, ui}))(TabSetup)