import React, { Component, createRef } from "react"
import { connect } from "react-redux"

import NavbarTab from "./navbarTab"

import { SETUP, ABOUT, JOIN} from "../utils/constants"

class Navbar extends Component {
    navbarRef = createRef()
    
    startShowTabs = (e) => {
        this.navbarRef.current.classList.remove("collapse", "show")
        this.navbarRef.current.classList.add("collapsing")
        
        setTimeout(() => {
            if (!this.navbarRef.current.style.height) {
                const height = [...this.navbarRef.current.children].reduce((a, b) => a + b.clientHeight, 0)
                this.navbarRef.current.style.height = `${height}px`
            }
            else {
                this.navbarRef.current.removeAttribute("style")
            }
        }, 0)

        this.props.dispatch({
            type: "ui",
            payload: {
                showTabs: !this.props.ui.showTabs
            },
        })
    }

    stopShowTabs = (e) => {
        if (e.target === this.navbarRef.current) {
            e.target.className = e.target.className.replace(" collapsing", " collapse")
            if (this.props.ui.showTabs) {
                e.target.className += " show"
            }
        }
    }

    componentDidMount() {
        if (typeof window === typeof undefined)
            return null

        window.addEventListener("transitionend", this.stopShowTabs)
        
        this.props.dispatch({
            type: "ui",
            payload: {
                tab: window.location.hash || SETUP
            },
        })
    }

    componentWillUnmount() {
        if (typeof window === typeof undefined)
            return null

        window.removeEventListener("transitionend", this.stopShowTabs)
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
                    onClick={this.startShowTabs}>
                    <div className="navbar-toggler-icon" />
                </button>
    
                <div ref={this.navbarRef} className="navbar-collapse collapse">
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