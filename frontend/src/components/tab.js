import React from "react"

const Tab = ({text, active, onClick, hidden, disabled}) => {
    return (
        <li
            className={`nav-item${active ? " show" : ""}`}
            hidden={hidden || false}>
            <button
                className={`bg-white nav-link${active ? " active" : ""}`}
                role="tab"
                onClick={onClick}
                disabled={disabled || !onClick}>
                <h1 className={`my-0${disabled ? " text-muted" : ""}`}>
                    {text}
                </h1>
            </button>
        </li>
    )
}

export default Tab