import { combineReducers } from "redux"

import game from "./game"
import player from "./player"
import obstacles from "./obstacles" 

const reducer = combineReducers({game, player, obstacles})

export default reducer