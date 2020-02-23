// action types
import { SET_USER } from "../actions/actionTypes";

// libraries
import _ from "lodash";

const users = (state = {}, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: _.get(action.payload, ["_id", "name", "email", "role"])
			};

		default:
			return state;
	}
};

export default users;
