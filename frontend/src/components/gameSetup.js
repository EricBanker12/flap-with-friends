import React, { useState } from "react"
import { Stage } from "react-pixi-fiber"
import {debounce} from "lodash"

import PlayerPreview from "./playerPreview"

const GameSetup = () => {
    const [colors, setColors] = useState({
        main: "#ff0000",
        accent: "#ffffff"
    })

    const handleColors = debounce((name, value) => {
        setColors({...colors, [name]: value})
    }, 100)

    return (
        <form>
            <h2 className="mx-4">Game Settings</h2>
            <label className="mx-4">
                <span>Rounds: </span>
                <input className="form-control" type='number' name='rounds' min={1} max={20} defaultValue={3} />
            </label>
            <h2 className="mx-4">Player Settings</h2>
            <div className="mx-4" style={{display: "flex", flexWrap: "wrap"}}>
                <div className="col-xs-12 col-sm-6 col-md-3 px-0">
                    <label>
                        <span>Nickname: </span>
                        <input className="form-control" type='text' name='nickname' />
                    </label>
                    <label style={{display: "block"}}>
                        <span>Main Color: </span>
                        <div style={{display: "inline", position: "relative"}}>
                            <input
                                type='color'
                                name="main"
                                style={{opacity: 0}}
                                defaultValue={colors.main}
                                onChange={({currentTarget: {name, value}}) => handleColors(name, value)}
                            />
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "1rem",
                                height: "1rem",
                                border: "1px solid #ced4da",
                                borderRadius: "1rem",
                                background: colors.main,
                            }}/>
                        </div>
                    </label>
                    <label style={{display: "block"}}>
                        <span>Accent Color: </span>
                        <div style={{display: "inline", position: "relative"}}>
                            <input
                                type='color'
                                name="accent"
                                style={{opacity: 0}}
                                defaultValue={colors.accent}
                                onChange={({currentTarget: {name, value}}) => handleColors(name, value)}
                            />
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "1rem",
                                height: "1rem",
                                border: "1px solid #ced4da",
                                borderRadius: "1rem",
                                background: colors.accent,
                            }}/>
                        </div>
                    </label>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 px-0 my-2" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div style={{width: 64, height: 64, borderRadius: 64, overflow: "hidden"}}>
                        <Stage options={{width: 64, height: 64, backgroundColor: 0x75CAEB}}>
                            <PlayerPreview
                                x={32}
                                y={32}
                                colors={colors}
                            />
                        </Stage>
                    </div>
                </div>
            </div>
            <div className="mx-4" style={{display: "flex", alignItems: "flex-end", height: "3rem"}}>
                <button className="btn btn-primary btn-lg col-sm-12 col-md-6" type='button'>Ready</button>
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

export default GameSetup