import React from "react"

const Tab = ({text, active, onClick, hidden}) => {
    return (
        <li className="nav-item" hidden={hidden || false}>
            <button
                className={`bg-white nav-link${active ? " active" : ""}`}
                role="tab"
                onClick={onClick}>
                <h1>{text}</h1>
            </button>
        </li>
    )
}

export default Tab