import { combineReducers } from "redux"

import game from "./game"
import player from "./player"
import settings from "./settings"
import ui from "./ui"
import chat from "./chat"

const reducer = combineReducers({game, player, settings, ui, chat})

export default reducer