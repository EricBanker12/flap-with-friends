const initState = {
    alive: true,
    score: 0,
    x: 0,
    dx: 0,
    y: 0,
    dy: 0,
}

export default function(state = initState, action) {
    if (action.type === "player") {
        for (let key in action.payload) {
            if (state[key] !== action.payload[key]) {
                return {...state, ...action.payload}
            }
        }
    }
    return state
}