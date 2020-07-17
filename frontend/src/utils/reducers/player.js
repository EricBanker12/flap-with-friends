const initState = {
    nickname: "",
    ready: false,
    mainColor: 0xff0000,
    mainColorHex: "#ff0000",
    accentColor: 0xffffff,
    accentColorHex: "#ffffff",
    alive: true,
    x: 0,
    dx: 0,
    y: 0,
    dy: 0,
}

export default function(state = initState, action) {
    return state
}