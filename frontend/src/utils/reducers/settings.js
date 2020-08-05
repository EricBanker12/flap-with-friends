const initState = {
    rounds: 1,
    nickname: "",
    ready: false,
    mainColor: 0xff0000,
    mainColorHex: "#ff0000",
    accentColor: 0xffffff,
    accentColorHex: "#ffffff",
}

export default function(state = initState, action) {
    let localState = state
    if (typeof localStorage !== "undefined" && state === initState) {
        const nickname = localStorage.getItem("nickname")
        const mainColorHex = localStorage.getItem("mainColorHex") || ""
        const mainColor = parseInt(mainColorHex.slice(1), 16)
        const accentColorHex = localStorage.getItem("accentColorHex") || ""
        const accentColor = parseInt(accentColorHex.slice(1), 16)
        localState = {
            ...state,
            nickname: nickname || state.nickname,
            mainColor: mainColor || state.mainColor,
            mainColorHex: mainColorHex || state.mainColorHex,
            accentColor: accentColor || state.accentColor,
            accentColorHex: accentColorHex || state.accentColorHex,
        }
    }
    if (action.type === "settings") {
        for (let key in action.payload) {
            if (localState[key] !== action.payload[key]) {
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
                }
                return {...localState, ...action.payload}
            }
        }
    }
    return localState
}