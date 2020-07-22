const initState = {
    nickname: "",
    ready: false,
    mainColor: 0xff0000,
    mainColorHex: "#ff0000",
    accentColor: 0xffffff,
    accentColorHex: "#ffffff",
    alive: true,
    score: 0,
    x: -633, // 5s from first obstacle
    dx: 2,
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