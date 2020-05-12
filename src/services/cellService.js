import http from "./httpService";

const apiEndpoint = "/cells";

function setTextCell(boardId, taskId, value, boardColumnId) {
	return http.post(`${apiEndpoint}/text`, {
		boardId,
		taskId,
		value,
		boardColumnId,
	});
}

function setLinkCell(boardId, taskId, value, boardColumnId) {
	return http.post(`${apiEndpoint}/link`, {
		boardId,
		taskId,
		value,
		boardColumnId,
	});
}

function setPriorityCell(boardId, taskId, value, boardColumnId) {
	return http.post(`${apiEndpoint}/priority`, {
		boardId,
		taskId,
		value,
		boardColumnId,
	});
}

function setStatusCell(boardId, taskId, value, boardColumnId) {
	return http.post(`${apiEndpoint}/status`, {
		boardId,
		taskId,
		value,
		boardColumnId,
	});
}

function setNumberCell(boardId, taskId, value, boardColumnId) {
	return http.post(`${apiEndpoint}/number`, {
		boardId,
		taskId,
		value,
		boardColumnId,
	});
}

function setDateCell(boardId, taskId, value, boardColumnId) {
	return http.post(`${apiEndpoint}/date`, {
		boardId,
		taskId,
		value,
		boardColumnId,
	});
}

export default {
	setTextCell,
	setLinkCell,
	setPriorityCell,
	setStatusCell,
	setNumberCell,
	setDateCell,
};
