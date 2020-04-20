import http from "./httpService";

const apiEndpoint = "/columns";

// get column types
function getColumnTypes() {
	return http.get("/column-types");
}

// create new board column
function createBoardColumn(boardId, columnId) {
	return http.post(apiEndpoint, {
		boardId,
		columnId,
	});
}

// delete column from board
function deleteBoardColumn(boardId, boardColumnId) {
	return http.delete(apiEndpoint, {
		data: {
			boardId,
			boardColumnId,
		},
	});
}

// update column name
function updateColumnName(boardId, boardColumnId, newName) {
	return http.put(apiEndpoint, {
		boardId,
		boardColumnId,
		newName,
	});
}

// reorder groups of a board
function reorderColumns(data) {
	const newColumns = data.newColumns.map((column) => column._id);
	return http.put(`${apiEndpoint}/reorder`, {
		boardId: data.boardId,
		columnsArray: newColumns,
	});
}

export default {
	reorderColumns,
	getColumnTypes,
	createBoardColumn,
	deleteBoardColumn,
	updateColumnName,
};
