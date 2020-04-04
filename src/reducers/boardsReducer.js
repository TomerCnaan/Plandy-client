import {
	SET_BOARD_NAMES,
	LOADING,
	ADD_BOARD_NAME,
	LOADING_BOARD,
	SET_BOARD_DATA,
	SET_NEW_GROUPS_ORDER,
	SET_NEW_COLUMNS_ORDER,
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
		default:
			return state;
	}
};

export default boards;
