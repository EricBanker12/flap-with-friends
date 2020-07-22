const initState = {
    0: {
        id: 0,
        x: 0,
        scored: false,
    },
    1: {
        id: 1,
        x: 193,
        scored: false,
    },
}

export default function(state = initState, action) {
    if (action.type === "obstacles") {
        for (let key in action.payload) {
            for (let key2 in action.payload[key]) { 
                if (!state[key] || state[key][key2] !== action.payload[key][key2]) {
                    return {...state, ...action.payload}
                }
            }
        }
    }
    return state
}