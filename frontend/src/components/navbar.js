import React, { Component, createRef } from "react"

import NavbarTab from "./navbarTab"

import { START, ABOUT, JOIN} from "../utils/constants"

class Navbar extends Component {
    navbarRef = createRef()
    
    startShowTabs = (e) => {
        this.navbarRef.current.classList.toggle("collapse")
        this.navbarRef.current.classList.toggle("collapsing")
        this.navbarRef.current.classList.toggle("show")
        
        setTimeout(() => {
            if (this.navbarRef.current.classList.contains("show")) {
                const height = [...this.navbarRef.current.children].reduce((a, b) => a + b.clientHeight, 0)
                this.navbarRef.current.style.height = `${height}px`
            }
            else {
                this.navbarRef.current.removeAttribute("style")
            }
        }, 0)
    }

    stopShowTabs = (e) => {
        if (e.target === this.navbarRef.current) {
            this.navbarRef.current.classList.toggle("collapse")
            this.navbarRef.current.classList.toggle("collapsing")
        }
    }

    componentDidMount() {
        if (typeof window === typeof undefined)
            return null

        window.addEventListener("transitionend", this.stopShowTabs)
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
                        {this.props.tab}
                    </h1>
                </div>
                
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-expanded={this.navbarRef.current && this.navbarRef.current.classList.contains("show")}
                    aria-label="Toggle navigation"
                    onClick={this.startShowTabs}>
                    <div className="navbar-toggler-icon" />
                </button>
    
                <div ref={this.navbarRef} className="navbar-collapse collapse">
                    <ul className="navbar-nav">
                        <NavbarTab tab={START} hidden={this.props.tab === START} />
                        <NavbarTab tab={ABOUT} hidden={this.props.tab === ABOUT} />
                        <NavbarTab tab={JOIN} hidden={this.props.tab === JOIN} />
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar