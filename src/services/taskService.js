import http from "./httpService";

const apiEndpoint = "/tasks";

// reorder tasks in the same group
function reorderInnerTasks(data) {
	const newTasks = data.newTasks.map((task) => task._id);
	return http.put(`${apiEndpoint}/reorder`, {
		boardId: data.boardId,
		groupId: data.groupId,
		tasksArray: newTasks,
	});
}

export default { reorderInnerTasks };
