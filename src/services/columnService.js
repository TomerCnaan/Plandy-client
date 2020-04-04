import http from "./httpService";

const apiEndpoint = "/columns";

// reorder groups of a board
function reorderColumns(data) {
	const newColumns = data.newColumns.map((column) => column._id);
	return http.put(`${apiEndpoint}/reorder`, {
		boardId: data.boardId,
		columnsArray: newColumns,
	});
}

export default { reorderColumns };
