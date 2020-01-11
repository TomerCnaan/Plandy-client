import { combineReducers } from "redux";
import todos from "./todoReducer";
import users from "./usersReducer";

export const mainReducer = combineReducers({
	todos,
	users
});
