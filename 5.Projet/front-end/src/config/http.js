import axios from 'axios';
import authHeader from '@/services/auth-header';
import AuthService from "@/services/auth.service";

// Create axios instance
const http = axios.create({ baseURL: process.env.VUE_APP_API_BASE_URL });

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
						// console.error(error.response);
						console.log('Interceptor: You are not authorized');
						if (localStorage.getItem('user')) {
								AuthService.logout();
								window.location.replace('/login?error=SIGN_IN_AGAIN');
						}
				}
				else if (error.response.status === 500) {
						console.error(error.response);
						if (localStorage.getItem('user')) {
								AuthService.logout();
								window.location.replace('/login?error=SERVER_ERROR');
						}
				}
				else if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.error(error.response.status);
						console.error(error.response.data);
						// console.error(error.response.headers);
						return Promise.reject(error.response);
				}
				else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.error(error.request);
				}
				else {
						// Something happened in setting up the request that triggered an Error
						console.error('Error', error.message);
				}
				// console.error(error.config);
				return Promise.reject(error);
		});

export default http;
