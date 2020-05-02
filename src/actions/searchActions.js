import { SET_SEARCH_QUERY } from "./actionTypes";

export const setSearchQuery = (value) => ({
	type: SET_SEARCH_QUERY,
	payload: {
		value,
	},
});
