import http from "./httpService";

const apiEndpoint = "/boards";

// create a new board
function createBoard(data) {
	return http.post(apiEndpoint, {
		name: data.name,
		type: data.type
	});
}

// get all boards - name and description
function getBoards() {
	return http.get(apiEndpoint);
}

// get specific board data
function getBoardData(id) {
	return http.get(`${apiEndpoint}/${id}`);
}

export default { createBoard, getBoards, getBoardData };
