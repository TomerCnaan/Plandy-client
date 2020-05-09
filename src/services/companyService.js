import http from "./httpService";

const apiEndpoint = "/companies";

function getCompanyInfo(companyId) {
	return http.get(`${apiEndpoint}/${companyId}`);
}

function getCompanyName(companyId) {
	return http.get(`${apiEndpoint}/name/${companyId}`);
}

export default { getCompanyInfo, getCompanyName };
