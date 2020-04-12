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

// reorder tasks that were moved to a different group
function reorderOuterTasks(data) {
	return http.put(`${apiEndpoint}/outer-reorder`, {
		boardId: data.boardId,
		sourceGroupId: data.sourceGroupId,
		destinationGroupId: data.destinationGroupId,
		taskIdToMove: data.taskIdToMove,
		newIndex: data.newIndex,
	});
}

// add task
function addTask(boardId, groupId) {
	return http.post(apiEndpoint, {
		boardId,
		groupId,
	});
}

// delete task
function deleteTask(boardId, groupId, taskId) {
	return http.delete(apiEndpoint, {
		data: {
			boardId,
			groupId,
			taskId,
		},
	});
}

export default { reorderInnerTasks, reorderOuterTasks, addTask, deleteTask };
