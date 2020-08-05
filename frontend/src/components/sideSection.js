import React from "react"
import { connect } from "react-redux"

import TabChat from "./tabChat"

import { DESKTOP } from "../utils/constants"

const SideSection = ({ui}) => {
    if (ui.device !== DESKTOP) {
        return null
    }
    
    return (
        <section className="col-md-6 px-0">
            <div className="mx-4">
                <TabChat device={DESKTOP} />
            </div>
        </section>
    )
}

export default connect(({ui})=>({ui}))(SideSection)