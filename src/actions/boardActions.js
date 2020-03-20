import { SET_BOARD_NAMES, LOADING, ADD_BOARD_NAME } from "./actionTypes";

import boardService from "../services/boardService";

export const addBoardName = board => ({
	type: ADD_BOARD_NAME,
	payload: board
});

export const setBoardNames = boardsList => ({
	type: SET_BOARD_NAMES,
	payload: boardsList
});

export const isLoading = bool => {
	return {
		type: LOADING,
		payload: bool
	};
};

export const fetchBoardNames = () => {
	return dispatch => {
		dispatch(isLoading(true));

		boardService
			.getBoards()
			.then(res => dispatch(setBoardNames(res.data)))
			.then(dispatch(isLoading(false)));
	};
};

// TODO: finish adding redux thunk logic to fetching data
