import axios from "axios";
import { API_BASE_URL } from '../config/constants'
import authHeader from '@/services/auth-header';

const http = axios.create({
		baseURL: API_BASE_URL,
		headers: authHeader()
});

http.interceptors.response.use(
		(response) => { return response },
		(error) => {
				if (error.response.status === 401) {
						// console.log(error.response);
						console.log('Interceptor: You are not authorized');
						localStorage.removeItem('user');
						window.location.replace('/login?error=SIGN_IN_AGAIN');
				}
				else if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
				}
				else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);
				}
				else {
						// Something happened in setting up the request that triggered an Error
						console.log('Error', error.message);
				}
				console.log(error.config);
				return Promise.reject(error);
		});

export default http;
