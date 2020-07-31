import { DESKTOP, SETUP } from "../constants"

const initState = {
    rounds: 1,
    round: 1,
    scale: 1,
    tab: SETUP,
    device: DESKTOP,
    baseTexture: null,
    textures: {},
    obstacles: [],
}

export default function(state = initState, action) {
    if (action.type === "game") {
        for (let key in action.payload) {
            if (state[key] !== action.payload[key]) {
                return {...state, ...action.payload}
            }
        }
    }
    return state
}