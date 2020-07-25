const initState = {
    nickname: "",
    ready: false,
    mainColor: 0xff0000,
    mainColorHex: "#ff0000",
    accentColor: 0xffffff,
    accentColorHex: "#ffffff",
    alive: true,
    score: 0,
    highScore: 0,
    x: -393, // 3s from first obstacle
    dx: 2,
    y: 0,
    dy: 0,
}

export default function(state = initState, action) {
    if (typeof localStorage !== "undefined" && state === initState) {
        const nickname = localStorage.getItem("nickname")
        const mainColorHex = localStorage.getItem("mainColorHex") || ""
        const mainColor = parseInt(mainColorHex.slice(1), 16)
        const accentColorHex = localStorage.getItem("accentColorHex") || ""
        const accentColor = parseInt(accentColorHex.slice(1), 16)
        const highScore = parseInt(localStorage.getItem("highScore")) 
        return {
            ...state,
            nickname: nickname || state.nickname,
            mainColor: mainColor || state.mainColor,
            mainColorHex: mainColorHex || state.mainColorHex,
            accentColor: accentColor || state.accentColor,
            accentColorHex: accentColorHex || state.accentColorHex,
            highScore: highScore || state.highScore,
        }
    }
    if (action.type === "player") {
        for (let key in action.payload) {
            if (state[key] !== action.payload[key]) {
                if (typeof localStorage !== "undefined") {
                    if("nickname" in action.payload) {
                        localStorage.setItem("nickname", action.payload["nickname"])
                    }
                    if ("mainColorHex" in action.payload) {
                        localStorage.setItem("mainColorHex", action.payload["mainColorHex"])
                    }
                    if ("accentColorHex" in action.payload) {
                        localStorage.setItem("accentColorHex", action.payload["accentColorHex"])
                    }
                    if ("highScore" in action.payload) {
                        localStorage.setItem("highScore", action.payload["highScore"])
                    }
                }
                return {...state, ...action.payload}
            }
        }
    }
    return state
}