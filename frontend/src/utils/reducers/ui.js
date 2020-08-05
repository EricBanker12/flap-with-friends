import { DESKTOP, SETUP } from "../constants"

const initState = {
    tab: SETUP,
    device: DESKTOP,
    playing: false,
    gameOver: false,
    score: 0,
    highScore: 0,
}

export default function(state = initState, action) {
    if (action.type === "ui") {
        for (let key in action.payload) {
            if (state[key] !== action.payload[key]) {
                return {...state, ...action.payload}
            }
        }
    }
    return state
}