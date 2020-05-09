import http from "./httpService";

const apiEndpoint = "/users";

function register(user) {
	return http.post(apiEndpoint, {
		name: user.name,
		email: user.email,
		password: user.password,
		company: { name: user.companyName },
	});
}

function sendInvitation(user) {
	return http.post(`${apiEndpoint}/add`, {
		email: user.email,
	});
}

function addUser(user, token) {
	return http.post(`${apiEndpoint}/add/${token}`, {
		name: user.name,
		email: user.email,
		password: user.password,
	});
}

function changeRole(userId, newRole) {
	return http.put(`${apiEndpoint}/role/${userId}`, {
		role: newRole,
	});
}

function updateUsername(name, id) {
	return http.put(`${apiEndpoint}/${id}`, {
		name,
	});
}

export default {
	register,
	sendInvitation,
	addUser,
	changeRole,
	updateUsername,
};
