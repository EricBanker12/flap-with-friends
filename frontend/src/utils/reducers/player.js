const initState = {
    alive: true,
    score: 0,
    highScore: 0,
    x: -360, // 3s from first obstacle
    dx: 2,
    y: 0,
    dy: 0,
}

export default function(state = initState, action) {
    let localState = state
    if (typeof localStorage !== "undefined" && state === initState) {
        const highScore = parseInt(localStorage.getItem("highScore"))
        localState = {
            ...state,
            highScore: highScore || state.highScore,
        }
    }
    if (action.type === "player") {
        for (let key in action.payload) {
            if (localState[key] !== action.payload[key]) {
                if (typeof localStorage !== "undefined") {
                    if ("highScore" in action.payload) {
                        localStorage.setItem("highScore", action.payload["highScore"])
                    }
                }
                return {...localState, ...action.payload}
            }
        }
    }
    return localState
}