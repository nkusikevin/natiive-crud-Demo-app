import axios from "axios";

const ApiClient = axios.create({
	baseURL: "http://localhost:8000/notes",
	headers: {
		"Content-type": "application/json",
	},
});

export default ApiClient;
