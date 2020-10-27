const initState = {
    scale: 1,
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