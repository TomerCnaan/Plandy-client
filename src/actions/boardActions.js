import {
	SET_BOARD_NAMES,
	LOADING,
	ADD_BOARD_NAME,
	LOADING_BOARD,
	SET_BOARD_DATA,
	SET_NEW_GROUPS_ORDER,
	SET_NEW_COLUMNS_ORDER,
} from "./actionTypes";

import boardService from "../services/boardService";
import { toast } from "react-toastify";

export const addBoardName = (board) => ({
	type: ADD_BOARD_NAME,
	payload: board,
});

export const setBoardNames = (boardsList) => ({
	type: SET_BOARD_NAMES,
	payload: boardsList,
});

export const isLoading = (bool) => {
	return {
		type: LOADING,
		payload: bool,
	};
};

export const fetchBoardNames = () => {
	return (dispatch) => {
		dispatch(isLoading(true));

		boardService
			.getBoards()
			.then((res) => dispatch(setBoardNames(res.data)))
			.then(dispatch(isLoading(false)));
	};
};

// fetch board data from server async
export const fetchBoardData = (id) => {
	return (dispatch) => {
		dispatch(isLoadingBoard(true));

		boardService
			.getBoardData(id)
			.then((res) => {
				dispatch(setBoardData(res.data));
			})
			.catch((err) => {
				if (err.response && err.response.status === 400)
					toast.error(err.response.data);
			})
			.then(() => {
				dispatch(isLoadingBoard(false));
			});
	};
};

export const isLoadingBoard = (bool) => {
	return {
		type: LOADING_BOARD,
		payload: bool,
	};
};

export const setBoardData = (data) => ({
	type: SET_BOARD_DATA,
	payload: data,
});

// set new groups order for a specific board
export const setNewGroupsOrder = (boardId, newGroupsArr) => ({
	type: SET_NEW_GROUPS_ORDER,
	payload: { boardId, newGroupsArr },
});

// set new column order for a specific board
export const setNewColumnsOrder = (boardId, newColumnsArr) => ({
	type: SET_NEW_COLUMNS_ORDER,
	payload: { boardId, newColumnsArr },
});
