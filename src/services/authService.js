import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt()); //set http header of the auth token.

export async function login(email, password) {
	const { data: jwt } = await http.post(apiEndpoint, { email, password }); //call server
	localStorage.setItem(tokenKey, jwt); //store auth token in the browser local storage
}

export function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export default {
	login,
	loginWithJwt,
	logout,
	getCurrentUser,
	getJwt,
};
