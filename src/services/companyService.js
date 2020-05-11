import http from "./httpService";

const apiEndpoint = "/companies";

function getCompanyInfo(companyId) {
	return http.get(`${apiEndpoint}/${companyId}`);
}

function getCompanyName(companyId) {
	return http.get(`${apiEndpoint}/name/${companyId}`);
}

function deleteCompany(companyId) {
	return http.delete(apiEndpoint, {
		data: {
			companyId,
		},
	});
}

export default { getCompanyInfo, getCompanyName, deleteCompany };
