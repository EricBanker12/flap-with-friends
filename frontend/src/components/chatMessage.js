import React from "react"

const ChatMessage = ({ type, ...props}) => {
    if (type === "player") {
        return (
            <p className="card-text" key={props.timeStamp}>{`${props.name}: ${props.message}`}</p>
        )
    }

    if (type === "ready") {
        return (
            <p className="card-text text-success" key={props.timeStamp}>{`${props.name} is ready!`}</p>
        )
    }

    return null
}

export default ChatMessage