import {
	SET_COLUMNS_WIDTH,
	SET_COLUMN_AMOUNT,
	SET_COL_WIDTH,
	SET_CELLS_WIDTH,
} from "./actionTypes";

export const setColumnContainerWidth = (width) => ({
	type: SET_COLUMNS_WIDTH,
	payload: {
		width,
	},
});

export const setColumnAmount = (amount) => ({
	type: SET_COLUMN_AMOUNT,
	payload: { amount },
});

export const setColumnWidth = (containerWidth, amount) => ({
	type: SET_COL_WIDTH,
	payload: { containerWidth, amount },
});

export const setCellsWidth = (width) => ({
	type: SET_CELLS_WIDTH,
	payload: { width },
});
