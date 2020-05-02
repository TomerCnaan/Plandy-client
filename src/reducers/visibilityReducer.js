import produce from "immer";

import {
	SET_COLUMNS_WIDTH,
	SET_COLUMN_AMOUNT,
	SET_COL_WIDTH,
	SET_CELLS_WIDTH,
} from "../actions/actionTypes";

const visibility = produce((draft = { maxAmountColumns: 6 }, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_COLUMNS_WIDTH:
			const width = payload.width;
			draft.columnsContainerWidth = width;
			return draft;

		case SET_COLUMN_AMOUNT:
			draft.columnAmount = payload.amount;
			return draft;
		case SET_COL_WIDTH:
			const calcWidth = payload.containerWidth / payload.amount;
			draft.columnWidth = `${calcWidth}px`;
			return draft;
		case SET_CELLS_WIDTH:
			draft.cellsContainerWidth = payload.width;
			return draft;
		default:
			return draft;
	}
});

export default visibility;
