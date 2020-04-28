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

// change board description
function changeDescription(boardId, description) {
	return http.put(`${apiEndpoint}/description`, {
		boardId,
		description,
	});
}

// get the users of the board by role
function getBoardUsers(boardId) {
	return http.get(`${apiEndpoint}/users/${boardId}`);
}

// get users from the company that are not in the board
function getUsersNotInBoard(boardId) {
	return http.get(`${apiEndpoint}/other-users/${boardId}`);
}

// add users to a board
function addUsersToBoard(boardId, users, permitted) {
	return http.post(`${apiEndpoint}/add-users`, {
		boardId,
		users,
		permitted,
	});
}

export default {
	createBoard,
	getBoards,
	getBoardData,
	deleteBoard,
	changeBoardType,
	changeDescription,
	getBoardUsers,
	getUsersNotInBoard,
	addUsersToBoard,
};
