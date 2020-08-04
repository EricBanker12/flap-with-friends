import React, { Component } from "react"
import { connect } from "react-redux"

import TabChat from "./tabChat"

import { DESKTOP } from "../utils/constants"

class SideSection extends Component {

    render() {
        return (
            <section className="col-md-6 px-0" hidden={this.props.game.device !== DESKTOP}>
                <div className="mx-4">
                    <TabChat device={DESKTOP} />
                </div>
            </section>
        )
    }
}

export default connect(({game})=>({game}))(SideSection)