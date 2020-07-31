import React, { Component } from "react"
import { connect } from "react-redux"
import { debounce } from "lodash-core"

import Tab from "./tab"

const SETUP = "Setup"
const ABOUT = "About"
const GAME = "Game"
const CHAT = "Chat"

class Tabs extends Component {
    state = {
        hideArrows: true,
        disableLeft: false,
        disableRight: false,
    }

    tabs = React.createRef()

    scrollLeft = () => {
        this.tabs.current.scrollLeft -= 80
    }

    scrollRight = () => {
        this.tabs.current.scrollLeft += 80
    }
    
    setTabFactory = (tab) => () => {
        this.props.dispatch({
            type: "game",
            payload: {tab}
        })
    }

    resize = () => {
        if (this.tabs.current) {
            const hideArrows = this.tabs.current.clientWidth === this.tabs.current.scrollWidth
            const disableLeft = hideArrows || this.tabs.current.scrollLeft === 0
            const disableRight = hideArrows || this.tabs.current.scrollLeft === this.tabs.current.scrollWidth - this.tabs.current.clientWidth
            this.setState({hideArrows, disableLeft, disableRight})
        }
    }

    resizeHandler = debounce(this.resize, 50, {leading: true})

    componentDidMount() {
        if (typeof window !== typeof undefined) {
            window.addEventListener("resize", this.resizeHandler)
        }
        if (this.tabs.current) {
            this.tabs.current.addEventListener("scroll", this.resizeHandler)
        }
    }

    componentWillUnmount() {
        if (typeof window !== typeof undefined) {
            window.removeEventListener("resize", this.resizeHandler)
        }
        if (this.tabs.current) {
            this.tabs.current.removeEventListener("scroll", this.resizeHandler)
        }
    }

    render() {
        return (
            <div className="d-flex">
                <button
                    className={`bg-white border border-secondary${this.state.disableLeft ? " disabled" : ""}`}
                    aria-label="scroll left"
                    onClick={this.scrollLeft}
                    disabled={this.state.disableLeft}
                    hidden={this.state.hideArrows}>
                    ←
                </button>
                <ul
                    className="nav nav-tabs flex-nowrap flex-grow-1 overflow-hidden"
                    ref={this.tabs}>
                    <Tab text={SETUP} active={this.props.game.tab === SETUP} onClick={this.setTabFactory(SETUP)} />
                    <Tab text={ABOUT} active={this.props.game.tab === ABOUT} onClick={this.setTabFactory(ABOUT)} />
                    <Tab text={GAME} active={this.props.game.tab === GAME} onClick={this.setTabFactory(GAME)} />
                    <Tab text={CHAT} active={this.props.game.tab === CHAT} onClick={this.setTabFactory(CHAT)} hidden={true} />
                </ul>
                <button
                    className={`bg-white border border-secondary${this.state.disableRight ? " disabled" : ""}`}
                    aria-label="scroll right"
                    onClick={this.scrollRight}
                    disabled={this.state.disableRight}
                    hidden={this.state.hideArrows}>
                    →
                </button>
            </div>
        )
    }
}

export default connect(({game}) => ({game}))(Tabs)