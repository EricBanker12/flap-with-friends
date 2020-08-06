import React, { useState } from "react"
import ChatMessage from "./chatMessage"
import { connect } from "react-redux"

const Chat = ({ chat, settings, dispatch, ...props }) => {
    const [input, setInput] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        if (input) {
            // ToDo: send message to other players
            dispatch({
                type: "chat",
                payload: {
                    type: "player",
                    // ToDo: player uuid
                    name: settings.nickname,
                    message: input,
                    timeStamp: new Date(Date.now()).toISOString(),
                }
            })
            setInput("")
        }
    }

    return (
        <div {...props} className="card">
            <div className="card-body">
                {chat.history.map((props) => <ChatMessage {...props} />)}
            </div>
            <form className="card-footer" onSubmit={onSubmit}>
                <input
                    className="form-control"
                    type="text"
                    maxLength={300}
                    onChange={(e) => {setInput(e.target.value)}}
                    value={input}
                />
            </form>
        </div>
    )
}

export default connect(({chat, settings}) => ({chat, settings}))(Chat)