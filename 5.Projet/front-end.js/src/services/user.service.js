import axios from 'axios';
import authHeader from './auth-header';
import { API_BASE_URL } from '@/config/constants'

class UserService {
		getPublicContent() {
				return axios.get(API_BASE_URL + '/all');
		}

		getUserBoard() {
				return axios.get(API_BASE_URL + '/user', { headers: authHeader() });
		}

		getModeratorBoard() {
				return axios.get(API_BASE_URL + '/mod', { headers: authHeader() });
		}

		getAdminBoard() {
				return axios.get(API_BASE_URL + '/admin', { headers: authHeader() });
		}
}

export default new UserService();
