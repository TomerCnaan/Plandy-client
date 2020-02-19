import http from "./httpService";

const apiEndpoint = "/users";

function register(user) {
	return http.post(apiEndpoint, {
		name: user.name,
		email: user.email,
		password: user.password,
		company: { name: user.companyName }
	});
}

export default { register };
