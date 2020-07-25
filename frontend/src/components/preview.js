import React, { Component, createRef } from "react"

import PreviewApplication from "./previewApplication"

class Preview extends Component {
    state = {preview: null}
    ref = createRef()

    componentDidMount() {
        const preview = new PreviewApplication()
        this.ref.current.appendChild(preview.app.view)
        this.setState({preview})
    }
    
    componentWillUnmount() {
        this.state.preview.destroy()
    }
    
    render() {
        return (
            <div
                ref={this.ref}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 64,
                    height: 64,
                    borderRadius: 64,
                    background: "#75CAEB",
                }}
            />
        )
    }
}

export default Preview