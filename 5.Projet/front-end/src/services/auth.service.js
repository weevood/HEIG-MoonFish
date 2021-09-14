import axios from 'axios';
import CacheService from "@/services/cache.service";

class AuthService {

		register(user) {
				return axios.post(process.env.VUE_APP_API_BASE_URL + '/register', {
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						password: user.password,
						lang: user.lang || 'en'
				});
		}

		verify(data) {
				return axios.post(process.env.VUE_APP_API_BASE_URL + '/verify', data);
		}

		login(user) {
				console.log(process.env.VUE_APP_API_BASE_URL + '/login')
				return axios
						.post(process.env.VUE_APP_API_BASE_URL + '/login', {
								email: user.email,
								password: user.password
						})
						.then(response => {
								if (response.data.token) {
										localStorage.setItem('user', JSON.stringify(response.data))
								}
								return response.data;
						});
		}

		logout() {
				CacheService.flush();
				localStorage.removeItem('user');
		}

		forgot(email) {
				return axios.post(process.env.VUE_APP_API_BASE_URL + '/forgot', { email });
		}

		reset(data) {
				return axios.post(process.env.VUE_APP_API_BASE_URL + '/reset', data);
		}
}

export default new AuthService();
