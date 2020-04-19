import { combineReducers } from "redux";
import users from "./usersReducer";
import boards from "./boardsReducer";
import visibility from "./visibilityReducer";

export const mainReducer = combineReducers({
	boards,
	users,
	visibility,
});
