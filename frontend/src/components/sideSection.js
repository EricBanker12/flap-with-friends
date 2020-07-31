import React, { Component } from "react"
import { connect } from "react-redux"
import { debounce } from "lodash-core"

import Tab from "./tab"
import TabChat from "./tabChat"

import { CHAT, DESKTOP, MOBILE, SETUP } from "../utils/constants"

class SideSection extends Component {
    resize = () => {
        if (this.props.game.device === DESKTOP && window.innerWidth < 576) {
            this.props.dispatch({
                type: "game",
                payload: {device: MOBILE}
            })
        }
        if (this.props.game.device === MOBILE && window.innerWidth >= 576) {
            if (this.props.game.tab === CHAT) {
                var tab = SETUP
            }
            this.props.dispatch({
                type: "game",
                payload: {device: DESKTOP, tab: tab || this.props.game.tab}
            })
        }
    }

    resizeHandler = debounce(this.resize, 50, {leading: true})
    
    componentDidMount() {
        if (typeof window !== typeof undefined) {
            this.resize()
            window.addEventListener("resize", this.resizeHandler)
        }
    }

    componentWillUnmount() {
        if (typeof window !== typeof undefined) {
            window.removeEventListener("resize", this.resizeHandler)
        }
    }

    render() {
        return (
            <section className="col-sm-6 px-0" hidden={this.props.game.device !== DESKTOP}>
                <ul className="nav nav-tabs">
                    <Tab text={CHAT} active={true} />
                </ul>
                <div className="mx-4">
                    <TabChat device={DESKTOP} />
                </div>
            </section>
        )
    }
}

export default connect(({game})=>({game}))(SideSection)