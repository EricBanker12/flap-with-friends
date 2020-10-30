import React, { useState, useCallback, useEffect } from "react"
import { connect } from "react-redux"
import { debounce } from "lodash"

const InputColor = ({label, name, settings, dispatch}) => {

    const [focus, setFocus] = useState(false)

    // Gatsby hydration work-around
    // https://stackoverflow.com/questions/59651070/gatsby-state-updates-only-on-development-but-not-on-build-production
    const [loaded, setLoaded] = useState(0)
    useEffect(() => {
        setLoaded(1)
    }, [])

    const handleFocus = (e) => {
        setFocus(true)
    }

    const handleBlur = (e) => {
        setFocus(false)
    }

    const dispatchColors = useCallback(debounce((name, value) => {
        dispatch({
            type: "settings",
            payload: {
                [name]: parseInt(value.slice(1), 16),
                [name + "Hex"]: value,
                ready: false,
            }
        })
    }, 100, {leading: true}), [dispatch])
    
    const handleColors = (e) => {
        const {name, value} = e.currentTarget
        dispatchColors(name, value)
    }

    return (
        <label>
            <span>{label}</span>
            <div style={{display: "inline", position: "relative"}}>
                <input
                    type='color'
                    name={name}
                    style={{opacity: 0, width: "1rem"}}
                    defaultValue={settings[name + "Hex"]}
                    onChange={handleColors}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <div
                    key={loaded}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "1rem",
                        height: "1rem",
                        border: focus ? "2px solid #158CBA" : "1px solid #ced4da",
                        borderRadius: "1rem",
                        background: settings[name + "Hex"],
                    }}
                />
            </div>
        </label>
    )
}

export default connect(({settings}) => ({settings}))(InputColor)