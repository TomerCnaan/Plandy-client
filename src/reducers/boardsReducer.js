import {
	SET_BOARD_NAMES,
	LOADING,
	ADD_BOARD_NAME
} from "../actions/actionTypes";

const intialState = {
	boardsList: []
};

const boards = (state = intialState, action) => {
	switch (action.type) {
		case ADD_BOARD_NAME:
			const updatedArr = state.boardsList;
			console.log(updatedArr);
			updatedArr.push(action.payload);
			return {
				...state,
				boardsList: updatedArr
			};
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
