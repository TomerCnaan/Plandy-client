import { SET_COLUMNS_WIDTH, SET_COLUMN_AMOUNT } from "../actions/actionTypes";

const visibility = (state = {}, action) => {
	switch (action.type) {
		case SET_COLUMNS_WIDTH:
			const width = `${action.payload.width}`;
			return {
				...state,
				columnsContainerWidth: width,
			};
		case SET_COLUMN_AMOUNT:
			return {
				...state,
				columnAmount: action.payload.amount,
			};
		default:
			return state;
	}
};

export default visibility;
