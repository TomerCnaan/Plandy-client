import http from "./httpService";

const apiEndpoint = "/boards";

function createBoard(data) {
	return http.post(apiEndpoint, {
		name: data.name,
		type: data.type
	});
}

function getBoards() {
	return http.get(apiEndpoint);
}

export default { createBoard, getBoards };
