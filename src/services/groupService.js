import http from "./httpService";

const apiEndpoint = "/groups";

// reorder groups of a board
function reorderGroups(data) {
	const newGroups = data.newGroups.map((group) => group._id);
	return http.put(`${apiEndpoint}/reorder`, {
		boardId: data.boardId,
		groupsArray: newGroups,
	});
}

// add new group
function addGroup(boardId) {
	return http.post(apiEndpoint, {
		boardId,
	});
}

// delete group
function deleteGroup(boardId, groupId) {
	return http.delete(apiEndpoint, {
		data: {
			boardId,
			groupId,
		},
	});
}

// update title
function updateGroupTitle(boardId, groupId, newTitle) {
	return http.put(`${apiEndpoint}/title`, {
		boardId,
		groupId,
		title: newTitle,
	});
}

export default { reorderGroups, addGroup, deleteGroup, updateGroupTitle };
