import React from "react"
import { navigate } from "gatsby"
import {debounce} from "lodash"
import { connect } from "react-redux"
import loadable from "@loadable/component"

const Preview = loadable(() => import("./preview"))

const GameSetup = ({game, player, dispatch}) => {
    
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
        dispatch({
            type: "player",
            payload: {
                [name]: Number(value.replace("#", "0x")),
                [name + "Hex"]: value,
            }
        })
    }, 100)
    
    const handleColors = (e) => {
        const {name, value} = e.currentTarget
        dispatchColors(name, value)
    }

    return (
        <form>
            <h2 className="mx-4">Game Settings</h2>
            <label className="mx-4">
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
            <h2 className="mx-4">Player Settings</h2>
            <div className="mx-4" style={{display: "flex", flexWrap: "wrap"}}>
                <div className="col-xs-12 col-sm-6 col-md-3 px-0">
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
                                style={{opacity: 0}}
                                defaultValue={player.mainColorHex}
                                onChange={handleColors}
                            />
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "1rem",
                                height: "1rem",
                                border: "1px solid #ced4da",
                                borderRadius: "1rem",
                                background: player.mainColorHex,
                            }}/>
                        </div>
                    </label>
                    <label style={{display: "block"}}>
                        <span>Accent Color: </span>
                        <div style={{display: "inline", position: "relative"}}>
                            <input
                                type='color'
                                name="accentColor"
                                style={{opacity: 0}}
                                defaultValue={player.accentColorHex}
                                onChange={handleColors}
                            />
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "1rem",
                                height: "1rem",
                                border: "1px solid #ced4da",
                                borderRadius: "1rem",
                                background: player.accentColorHex,
                            }}/>
                        </div>
                    </label>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 px-0 my-2" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Preview mainColor={player.mainColor} accentColor={player.accentColor} />
                </div>
            </div>
            <div className="mx-4" style={{display: "flex", alignItems: "flex-end", height: "3rem"}}>
                <button
                    className="btn btn-primary btn-lg col-sm-12 col-md-6"
                    type='button'
                    onClick={()=>{navigate("/game")}}>
                    Ready
                </button>
            </div>
            <h2 className="mx-4">Player Status</h2>
            <div className="mx-4">
                <p>To Do</p>
            </div>
            <div className="mx-4" style={{display: "flex", alignItems: "flex-end", height: "3rem"}}>
                <button className="btn btn-warning btn-lg col-sm-12 col-md-6" type='submit'>Start</button>
            </div>
        </form>
    )
}

export default connect(({game, player}) => ({game, player}))(GameSetup)