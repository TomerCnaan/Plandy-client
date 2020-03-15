import { combineReducers } from "redux";
import users from "./usersReducer";
import boards from "./boardsReducer";

export const mainReducer = combineReducers({
	boards,
	users
});
