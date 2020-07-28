import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { debounce } from "lodash-core"
import { connect } from "react-redux"
import loadable from "@loadable/component"
import Axios from "axios"

const Preview = loadable(() => import("./preview"))

const GameSetup = ({game, player, dispatch}) => {

    const [focus, setFocus] = useState("")
    
    // Gatsby hydration work-around
    // https://stackoverflow.com/questions/59651070/gatsby-state-updates-only-on-development-but-not-on-build-production
    const [loaded, setLoaded] = useState(false) 

    useEffect(()=>{
        setLoaded(true)
    }, [setLoaded])

    const handleFocus = (e) => {
        setFocus(e.currentTarget.name)
    }

    const handleBlur = (e) => {
        setFocus("")
    }
    
    const handleGameInput = (e) => {
        const {name, value} = e.currentTarget
        dispatch({
            type: "game",
            payload: {[name]: value}
        })
    }

    const handlePlayerInput = (e) => {
        const {name, value} = e.currentTarget
        dispatch({
            type: "player",
            payload: {[name]: value}
        })
    }

    const dispatchColors = debounce((name, value) => {
        console.log("dispatch color")
        dispatch({
            type: "player",
            payload: {
                [name]: parseInt(value.slice(1), 16),
                [name + "Hex"]: value,
            }
        })
    }, 100)
    
    const handleColors = (e) => {
        const {name, value} = e.currentTarget
        dispatchColors(name, value)
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
            navigate("/play")
        }
        catch (err) {
            navigate("/play")
        }
    }

    return (
        <form onSubmit={play}>
            <h2>Game Settings</h2>
            <label >
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
                    <label style={{display: "block"}}>
                        <span>Main Color: </span>
                        <div style={{display: "inline", position: "relative"}}>
                            <input
                                type='color'
                                name="mainColor"
                                style={{opacity: 0, width: "1rem"}}
                                defaultValue={player.mainColorHex}
                                onChange={handleColors}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            <div
                                key={loaded} // Gatsby hydration work-around
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    width: "1rem",
                                    height: "1rem",
                                    border: focus === "mainColor" ? "2px solid #158CBA" : "1px solid #ced4da",
                                    borderRadius: "1rem",
                                    background: player.mainColorHex,
                                }}
                            />
                        </div>
                    </label>
                    <label style={{display: "block"}}>
                        <span>Accent Color: </span>
                        <div style={{display: "inline", position: "relative"}}>
                            <input
                                type='color'
                                name="accentColor"
                                style={{opacity: 0, width: "1rem"}}
                                defaultValue={player.accentColorHex}
                                onChange={handleColors}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            <div
                                key={loaded} // Gatsby hydration work-around
                                style={{
                                    position: "absolute",
                                    display: "block",
                                    bottom: 0,
                                    left: 0,
                                    width: "1rem",
                                    height: "1rem",
                                    border: focus === "accentColor" ? "2px solid #158CBA" : "1px solid #ced4da",
                                    borderRadius: "1rem",
                                    background: player.accentColorHex,
                                }}
                            />
                        </div>
                    </label>
                </div>
                <div className="col-6 px-0" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Preview />
                </div>
            </div>
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
    )
}

export default connect(({game, player}) => ({game, player}))(GameSetup)