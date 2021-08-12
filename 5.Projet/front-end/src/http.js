import axios from "axios";
import { API_BASE_URL } from '../config/constants'
import authHeader from '@/services/auth-header';

export default axios.create({
		baseURL: API_BASE_URL,
		headers: authHeader()
});
