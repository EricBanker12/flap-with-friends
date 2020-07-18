const initState = {
    rounds: 3,
    round: 1,
    scale: 1,
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