const initState = {
    history: [], // queue is not more performant due to O(n) array conversion for React component map and timestamp sort
}

export default function(state = initState, action) {
    if (action.type === "chat") {
        if (state.history.length >= 50) {
            state.history.splice(0, state.history.length - 49)
        }
        state.history.push(action.payload)
        // ToDo: sort by timestamp if timestamp before last message
        return {...state}
    }
    return state
}