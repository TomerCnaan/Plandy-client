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
			console.log("in add task");
			let updatedGroups = state.boardsData[action.payload.boardId].groups;
			console.log(updatedGroups);
			const groupTasks = updatedGroups[action.payload.groupIndex];
			console.log(groupTasks);
			groupTasks.tasks.push(action.payload.task);
			updatedGroups[action.payload.groupIndex] = groupTasks;
			console.log(updatedGroups);

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
		default:
			return state;
	}
};

export default boards;
