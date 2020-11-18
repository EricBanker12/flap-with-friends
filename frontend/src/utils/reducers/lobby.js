const initState = {
  lobbyId: "",
  peerId: "",
}

export default function(state = initState, action) {
  if (action.type === "lobby") {
      for (let key in action.payload) {
          if (state[key] !== action.payload[key]) {
              return {...state, ...action.payload}
          }
      }
  }
  return state
}