import React, { Component } from "react"

import NavbarTab from "./navbarTab"

import { SETUP, ABOUT, JOIN} from "../utils/constants"
import { connect } from "react-redux"

class Navbar extends Component {
    
    toggleShowTabs = (e) => {
        this.props.dispatch({
            type: "ui",
            payload: {
                showTabs: !this.props.ui.showTabs
            },
        })
    }

    componentDidMount() {
        if (typeof window === typeof undefined)
            return null
        
        this.props.dispatch({
            type: "ui",
            payload: {
                tab: window.location.hash || SETUP
            },
        })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light col-12">
                <div className="navbar-brand">
                    <h1 className="m-0">
                        {this.props.ui.tab.match(RegExp(`${SETUP}|${ABOUT}|${JOIN}`))}
                    </h1>
                </div>
                
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-expanded={this.props.ui.showTabs}
                    aria-label="Toggle navigation"
                    onClick={this.toggleShowTabs}>
                    <div className="navbar-toggler-icon" />
                </button>
    
                <div className={`collapse navbar-collapse${this.props.ui.showTabs ? " show" : ""}`}>
                    <ul className="navbar-nav">
                        <NavbarTab tab={SETUP} />
                        <NavbarTab tab={ABOUT} />
                        <NavbarTab tab={JOIN} />
                    </ul>
                </div>
            </nav>
        )
    }
}

export default connect(({ui}) => ({ui}))(Navbar)