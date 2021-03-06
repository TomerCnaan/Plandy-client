import { produce } from "immer";

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
} from "../actions/actionTypes";

const intialState = {
	boardsList: [],
	boardsData: {},
};

const boards = (state = intialState, action) => {
	switch (action.type) {
		case ADD_BOARD_NAME:
			const updatedArr = state.boardsList;
			updatedArr.push(action.payload);
			return {
				...state,
				boardsList: updatedArr,
			};
		case SET_BOARD_NAMES:
			return {
				...state,
				boardsList: action.payload,
			};
		case LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case LOADING_BOARD:
			return {
				...state,
				isLoadingBoard: action.payload,
			};
		case SET_BOARD_DATA:
			return {
				...state,
				boardsData: {
					...state.boardsData,
					[action.payload._id]: action.payload,
				},
			};
		case SET_NEW_GROUPS_ORDER:
			const id = action.payload.boardId;
			return {
				...state,
				boardsData: {
					...state.boardsData,
					[id]: {
						...state.boardsData[id],
						groups: action.payload.newGroupsArr,
					},
				},
			};
		case SET_NEW_COLUMNS_ORDER:
			const culId = action.payload.boardId;
			return {
				...state,
				boardsData: {
					...state.boardsData,
					[culId]: {
						...state.boardsData[culId],
						column_order: action.payload.newColumnsArr,
					},
				},
			};
		case DELETE_BOARD:
			const newData = { ...state.boardsData };
			if (state.boardsData[action.payload.id])
				delete newData[action.payload.id];
			else newData[action.payload.id] = action.payload.oldData;
			return {
				...state,
				boardsList: action.payload.bList, //new boards list
				boardsData: newData,
			};
		case CHANGE_TYPE:
			return {
				...state,
				boardsData: {
					...state.boardsData,
					[action.payload.id]: {
						...state.boardsData[action.payload.id],
						type: action.payload.type,
					},
				},
			};
		case ADD_GROUP:
			const boardGroups = state.boardsData[action.payload.id].groups;
			boardGroups.push(action.payload.group);
			return {
				...state,
				boardsData: {
					...state.boardsData,
					[action.payload.id]: {
						...state.boardsData[action.payload.id],
						groups: boardGroups,
					},
				},
			};
		case ADD_TASK:
			let updatedGroups = state.boardsData[action.payload.boardId].groups;
			const groupTasks = updatedGroups[action.payload.groupIndex];
			groupTasks.tasks.push(action.payload.task);
			updatedGroups[action.payload.groupIndex] = groupTasks;

			return {
				...state,
				boardsData: {
					...state.boardsData,
					[action.payload.boardId]: {
						...state.boardsData[action.payload.boardId],
						groups: updatedGroups,
					},
				},
			};
		case DELETE_GROUP:
			const newGroups = state.boardsData[action.payload.boardId].groups;
			newGroups.splice(action.payload.index, 1);
			return {
				...state,
				boardsData: {
					...state.boardsData,
					[action.payload.boardId]: {
						...state.boardsData[action.payload.boardId],
						groups: newGroups,
					},
				},
			};
		case REVERSE_DELETE_GROUP:
			const returnGroup = state.boardsData[action.payload.boardId].groups;
			returnGroup.splice(action.payload.index, 0, action.payload.group);
			return {
				...state,
				boardsData: {
					...state.boardsData,
					[action.payload.boardId]: {
						...state.boardsData[action.payload.boardId],
						groups: returnGroup,
					},
				},
			};
		case DELETE_TASK:
			let newGroupsList = state.boardsData[action.payload.boardId].groups;
			newGroupsList[action.payload.index].tasks = action.payload.newTasks;

			return {
				...state,
				boardsData: {
					...state.boardsData,
					[action.payload.boardId]: {
						...state.boardsData[action.payload.boardId],
						groups: newGroupsList,
					},
				},
			};
		case UPDATE_DESCRIPTION:
			const { boardId, description } = action.payload;
			return {
				...state,
				boardsData: {
					...state.boardsData,
					[boardId]: {
						...state.boardsData[boardId],
						description: description,
					},
				},
			};
		case UPDATE_GROUP_TITLE:
			const newGroupsTitle = state.boardsData[action.payload.boardId].groups;
			newGroupsTitle[action.payload.groupIndex].title = action.payload.newTitle;
			return {
				...state,
				boardsData: {
					...state.boardsData,
					[action.payload.boardId]: {
						...state.boardsData[action.payload.boardId],
						groups: newGroupsTitle,
					},
				},
			};
		case UPDATE_TASK_NAME:
			const groupsUpdatedTask = state.boardsData[action.payload.boardId].groups;
			groupsUpdatedTask[action.payload.groupIndex].tasks[
				action.payload.taskIndex
			].name = action.payload.newName;
			return {
				...state,
				boardsData: {
					...state.boardsData,
					[action.payload.boardId]: {
						...state.boardsData[action.payload.boardId],
						groups: groupsUpdatedTask,
					},
				},
			};
		case ADD_COLUMN:
			const newColumns = state.boardsData[action.payload.boardId].column_order;
			newColumns.push(action.payload.newColumn);
			return {
				...state,
				boardsData: {
					...state.boardsData,
					[action.payload.boardId]: {
						...state.boardsData[action.payload.boardId],
						column_order: newColumns,
					},
				},
			};
		case DELETE_COLUMN:
			const deletedColumns =
				state.boardsData[action.payload.boardId].column_order;
			if (!action.payload.column)
				deletedColumns.splice(action.payload.columnIndex, 1);
			else
				deletedColumns.splice(
					action.payload.columnIndex,
					0,
					action.payload.column
				);
			return {
				...state,
				boardsData: {
					...state.boardsData,
					[action.payload.boardId]: {
						...state.boardsData[action.payload.boardId],
						column_order: deletedColumns,
					},
				},
			};
		case SET_GROUP_COLOR:
			return produce(state, (draftState) => {
				draftState.boardsData[action.payload.boardId].groups[
					action.payload.groupIndex
				].color = action.payload.color;
			});
		default:
			return state;
	}
};

export default boards;
