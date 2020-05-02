import { combineReducers } from "redux";
import users from "./usersReducer";
import boards from "./boardsReducer";
import visibility from "./visibilityReducer";
import search from "./searchReducer";

export const mainReducer = combineReducers({
	boards,
	users,
	search,
	visibility,
});
