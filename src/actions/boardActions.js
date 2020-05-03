import {
	SET_BOARD_NAMES,
	LOADING,
	ADD_BOARD_NAME,
	LOADING_BOARD,
	SET_BOARD_DATA,
	SET_NEW_GROUPS_ORDER,
	SET_NEW_COLUMNS_ORDER,
	DELETE_BOARD,
	CHANGE_TYPE,
	ADD_GROUP,
	ADD_TASK,
	DELETE_GROUP,
	REVERSE_DELETE_GROUP,
	DELETE_TASK,
	UPDATE_DESCRIPTION,
	UPDATE_GROUP_TITLE,
	UPDATE_TASK_NAME,
	ADD_COLUMN,
	DELETE_COLUMN,
	SET_GROUP_COLOR,
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
		dispatch(isLoadingBoard(true)); //set app to loading board state

		boardService
			.getBoardData(id) //get board data from the server
			.then((res) => {
				dispatch(setBoardData(res.data)); //set board data in the store
			})
			.catch((err) => {
				if (err.response && err.response.status === 400)
					toast.error(err.response.data);
			})
			.then(() => {
				dispatch(isLoadingBoard(false)); //set loading board state to false
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

// delete a board
export const deleteBoard = (boardId, newBoardsList, oldData) => ({
	type: DELETE_BOARD,
	payload: { id: boardId, bList: newBoardsList, oldData },
});

// change board type
export const changeType = (boardId, type) => ({
	type: CHANGE_TYPE,
	payload: { id: boardId, type },
});

// add group
export const addGroup = (boardId, newGroup) => ({
	type: ADD_GROUP,
	payload: { id: boardId, group: newGroup },
});

// add task
export const addTask = (boardId, groupIndex, newTask) => ({
	type: ADD_TASK,
	payload: { boardId, groupIndex, task: newTask },
});

// delete group
export const deleteGroup = (boardId, groupIndex) => ({
	type: DELETE_GROUP,
	payload: { boardId, index: groupIndex },
});

// reverse group delete
export const reverseDeleteGroup = (boardId, groupIndex, group) => ({
	type: REVERSE_DELETE_GROUP,
	payload: { boardId, index: groupIndex, group },
});

export const deleteTask = (boardId, groupIndex, tasksList) => ({
	type: DELETE_TASK,
	payload: { boardId, index: groupIndex, newTasks: tasksList },
});

export const updateDescription = (boardId, description) => ({
	type: UPDATE_DESCRIPTION,
	payload: { boardId, description },
});

export const updateGroupTitle = (boardId, groupIndex, newTitle) => ({
	type: UPDATE_GROUP_TITLE,
	payload: { boardId, groupIndex, newTitle },
});

export const updateTaskName = (boardId, groupIndex, taskIndex, newName) => ({
	type: UPDATE_TASK_NAME,
	payload: { boardId, groupIndex, taskIndex, newName },
});

// add column
export const addColumn = (boardId, newColumn) => ({
	type: ADD_COLUMN,
	payload: { boardId, newColumn },
});

// delete column
export const deleteColumn = (boardId, columnIndex, column) => ({
	type: DELETE_COLUMN,
	payload: { boardId, columnIndex, column },
});

// set group color
export const changeGroupColor = (boardId, groupIndex, newColor) => ({
	type: SET_GROUP_COLOR,
	payload: { boardId, groupIndex, color: newColor },
});
