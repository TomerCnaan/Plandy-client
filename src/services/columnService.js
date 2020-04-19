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

function deleteBoardColumn(boardId, boardColumnId) {
	return http.delete(apiEndpoint, {
		data: {
			boardId,
			boardColumnId,
		},
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
};
