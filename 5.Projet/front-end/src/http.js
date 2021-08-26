import axios from "axios";
import { API_BASE_URL } from '../config/constants'
import authHeader from '@/services/auth-header';
import AuthService from "@/services/auth.service";

// Create axios instance
const http = axios.create({ baseURL: API_BASE_URL });

// Add authentication headers to requests via interceptor
http.interceptors.request.use(function(config) {
		config.headers.Authorization = authHeader().Authorization;
		return config;
});

// Intercept the response to resolve or to manage errors
http.interceptors.response.use(
		(response) => {
				return Promise.resolve(response.data);
		},
		(error) => {
				if (error.response.status === 401) {
						// console.log(error.response);
						console.log('Interceptor: You are not authorized');
						AuthService.logout();
						window.location.replace('/login?error=SIGN_IN_AGAIN');
				}
				else if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						// console.log(error.response.headers);
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
				// console.log(error.config);
				return Promise.reject(error);
		});

export default http;
