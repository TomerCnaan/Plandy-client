import http from "./httpService";

const apiEndpoint = "/groups";

// reorder groups of a board
function reorderGroups(data) {
	const newGroups = data.newGroups.map(group => group._id);
	return http.put(`${apiEndpoint}/reorder`, {
		boardId: data.boardId,
		groupsArray: newGroups
	});
}

export default { reorderGroups };
