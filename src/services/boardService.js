import http from "./httpService";

const apiEndpoint = "/boards";

// create a new board
function createBoard(data) {
	return http.post(apiEndpoint, {
		name: data.name,
		type: data.type,
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

// delete a board
function deleteBoard(id) {
	return http.delete(`${apiEndpoint}/${id}`);
}

// change board type
function changeBoardType(type, boardId) {
	return http.put(`${apiEndpoint}/type`, {
		type,
		boardId,
	});
}

function changeDescription(boardId, description) {
	http.put(`${apiEndpoint}/description`, {
		boardId,
		description,
	});
}

function getBoardUsers(boardId) {
	http.get(`${apiEndpoint}/users/${boardId}`);
}

export default {
	createBoard,
	getBoards,
	getBoardData,
	deleteBoard,
	changeBoardType,
	changeDescription,
	getBoardUsers,
};
