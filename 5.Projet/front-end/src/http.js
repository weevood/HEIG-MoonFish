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
						console.log('Interceptor: You are not authorized');
						// console.log(error.response);
						localStorage.removeItem('user');
						window.location.replace('/login?error=SIGN_IN_AGAIN');
				}
				return Promise.reject(error);
		});

export default http;
