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

export default { setTextCell };
