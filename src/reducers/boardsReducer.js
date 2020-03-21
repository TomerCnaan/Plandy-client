import {
	SET_BOARD_NAMES,
	LOADING,
	ADD_BOARD_NAME,
	LOADING_BOARD,
	SET_BOARD_DATA
} from "../actions/actionTypes";

const intialState = {
	boardsList: [],
	boardsData: {}
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
		case LOADING_BOARD:
			return {
				...state,
				isLoadingBoard: action.payload
			};
		case SET_BOARD_DATA:
			return {
				...state,
				boardsData: {
					[action.payload.name]: action.payload
				}
			};
		default:
			return state;
	}
};

export default boards;
