import produce from "immer";

import { SET_SEARCH_QUERY } from "../actions/actionTypes";

const initialState = {
	searchQuery: "",
};

const search = produce((draft = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_SEARCH_QUERY:
			draft.searchQuery = payload.value;
			return draft;
		default:
			return draft;
	}
});

export default search;
