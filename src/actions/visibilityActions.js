import { SET_COLUMNS_WIDTH, SET_COLUMN_AMOUNT } from "./actionTypes";

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
