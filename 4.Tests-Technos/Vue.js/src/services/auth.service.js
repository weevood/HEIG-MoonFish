import axios from 'axios';

const API_URL = 'http://localhost:3001/';

class AuthService {
		login(user) {
				return axios
						.post(API_URL + 'auth', {
								email: user.email,
								password: user.password
						})
						.then(response => {
								if(response.data.token) {
										return this.me(response.data.token)
								}
						});
		}

		me(token) {
				return axios
						.post(API_URL + 'users/me', {
								token: token
						})
						.then(response => {
								if(response.data) {
										localStorage.setItem('user', JSON.stringify(response.data));
								}
								return response.data;
						});
		}

		logout() {
				localStorage.removeItem('user');
		}

		register(user) {
				return axios.post(API_URL + 'users', {
						email: user.email,
						password: user.password
				});
		}
}

export default new AuthService();
