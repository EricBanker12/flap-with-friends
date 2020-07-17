const initState = {
    rounds: 3,
    round: 1,
    scale: 1,
}

export default function(state = initState, action) {
    if (action.payload) {
        for (let key in action.payload) {
            if (state[key] !== action.payload[key]) {
                // console.log(action.type)
                return {...state, ...action.payload}
            }
        }
    }
    return state
}