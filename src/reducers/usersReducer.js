// action types
import { SET_USER, REMOVE_USER } from "../actions/actionTypes";

const users = (state = {}, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.payload,
			};

		case REMOVE_USER:
			let st = { ...state };
			return delete st.user;

		default:
			return state;
	}
};

export default users;
