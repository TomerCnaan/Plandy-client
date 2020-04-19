import {
	SET_COLUMNS_WIDTH,
	SET_COLUMN_AMOUNT,
	SET_COL_WIDTH,
	SET_CELLS_WIDTH,
} from "../actions/actionTypes";

const visibility = (state = { maxAmountColumns: 6 }, action) => {
	switch (action.type) {
		case SET_COLUMNS_WIDTH:
			const width = action.payload.width;
			return {
				...state,
				columnsContainerWidth: width,
			};
		case SET_COLUMN_AMOUNT:
			return {
				...state,
				columnAmount: action.payload.amount,
			};
		case SET_COL_WIDTH:
			const calcWidth = action.payload.containerWidth / action.payload.amount;
			// const max = Math.floor(action.payload.containerWidth / 120);
			return {
				...state,
				columnWidth: `${calcWidth}px`,
			};
		case SET_CELLS_WIDTH:
			return {
				...state,
				cellsContainerWidth: action.payload.width,
			};
		default:
			return state;
	}
};

export default visibility;
