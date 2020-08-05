import { combineReducers } from "redux"

import game from "./game"
import player from "./player"
import settings from "./settings"
import ui from "./ui"

const reducer = combineReducers({game, player, settings, ui})

export default reducer