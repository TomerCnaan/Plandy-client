import http from "./httpService";

const apiEndpoint = "/boards";

function createBoard(data) {
	return http.post(apiEndpoint, {
		name: data.name,
		type: data.type
	});
}

export default { createBoard };
