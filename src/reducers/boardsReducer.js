import { SET_BOARD_NAMES, LOADING } from "../actions/actionTypes";

// const INITIAL_STATE = {
// 	isLoading: false
// };

const boards = (state = {}, action) => {
	switch (action.type) {
		case SET_BOARD_NAMES:
			return {
				...state,
				boardsList: action.payload
			};
		case LOADING:
			return {
				...state,
				isLoading: action.payload
			};
		default:
			return state;
	}
};

export default boards;
