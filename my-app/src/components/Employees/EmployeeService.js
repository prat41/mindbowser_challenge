import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class EmployeeService{
	
	// constructor(){}

	getEmployees() {
		const url = `${API_URL}/employee/data/`;
		return axios.get(url).then(response => response.data);
	}

	// getEmployeesByURLLink(link){
	// 	const url = `${API_URL}${link}`;
	// 	return axios.get(url).then(response => response.data);
	// }

	getEmployeeById(id) {
		const url = `${API_URL}/employee/data/?id=${id}`;
		return axios.get(url).then(response => response.data);
	}

	deleteEmployee(id){
		const url = `${API_URL}/employee/data/?id=${id}`;
		return axios.delete(url).then(response => response.data);
	}

	createEmployee(product){
		const url = `${API_URL}/employee/data/`;
		return axios.post(url,product);
	}

	updateEmployee(product){
		const url = `${API_URL}/employee/data/`;
		return axios.put(url,product).then(response => response.data);
	}
}