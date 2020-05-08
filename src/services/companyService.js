import http from "./httpService";

const apiEndpoint = "/companies";

function getCompanyInfo(companyId) {
	console.log("getting company info");
	return http.get(`${apiEndpoint}/${companyId}`);
}

export default { getCompanyInfo };
