import { combineReducers } from "redux"

import game from "./game"
import player from "./player"

const reducer = combineReducers({game, player})

export default reducer