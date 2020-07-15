import React, { useState } from "react"

const GameSetup = () => {
    const [charColor, setCharColor] = useState("#ff0000")

    return (
        <form>
            <h2 className="mx-4">Game Settings</h2>
            <label className="mx-4">
                <span>Rounds:</span>
                <input className="form-control" type='number' name='rounds' min={1} max={20} defaultValue={3} />
            </label>
            <h2 className="mx-4">Player Settings</h2>
            <label className="mx-4">
                <span>Nickname:</span>
                <input className="form-control" type='text' name='nickname' />
            </label>
            <label className="mx-4" style={{display: "flex", flexDirection: "column", width: "8ch"}}>
                <span>Color: </span>
                <div style={{position: "relative"}}>
                    <input
                        type='color'
                        name='color'
                        style={{width: 1, height: 1}}
                        value={charColor}
                        onChange={(e) => {setCharColor(e.currentTarget.value)}}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "1rem",
                            height: "1rem",
                            border: "1px solid #ced4da",
                            borderRadius: "1rem",
                            background: charColor,
                        }}>
                    </div>
                </div>
            </label>
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