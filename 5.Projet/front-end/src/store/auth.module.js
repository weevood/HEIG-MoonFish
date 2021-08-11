import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
		? { status: { loggedIn: true }, user }
		: { status: { loggedIn: false }, user: null };

function handleError(err) {
		if (err.response && err.response.data.error) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(err.response.data.error);
				// console.log(err.response.status);
				// console.log(err.response.headers);
				return Promise.reject(err.response.data.error);
		}
		else if (err.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(err.request);
		}
		else {
				// Something happened in setting up the request that triggered an Error
				console.error('Error', err.message);
		}
		console.log(err.config);
		return Promise.reject(err);
}

export const auth = {
		namespaced: true,
		state: initialState,
		actions: {
				register({ commit }, user) {
						return AuthService.register(user).then(
								response => {
										commit('success');
										return Promise.resolve(response.data);
								},
								error => {
										commit('failure');
										return handleError(error);
								}
						);
				},
				verify({ commit }, verifyData) {
						return AuthService.verify(verifyData).then(
								response => {
										commit('success');
										return Promise.resolve(response.data);
								},
								error => {
										commit('failure');
										return handleError(error);
								}
						);
				},
				login({ commit }, user) {
						return AuthService.login(user).then(
								user => {
										commit('loginSuccess', user);
										return Promise.resolve(user);
								},
								error => {
										commit('loginFailure');
										return handleError(error);
								}
						);
				},
				logout({ commit }) {
						AuthService.logout();
						commit('logout');
				},
				forgot({ commit }, user) {
						return AuthService.forgot(user).then(
								response => {
										commit('success');
										return Promise.resolve(response.data);
								},
								error => {
										commit('failure');
										return handleError(error);
								}
						);
				},
				reset({ commit }, resetData) {
						return AuthService.reset(resetData).then(
								response => {
										commit('success');
										return Promise.resolve(response.data);
								},
								error => {
										commit('failure');
										return handleError(error);
								}
						);
				},
		},
		mutations: {
				success(state) {
						state.status.loggedIn = false;
				},
				failure(state) {
						state.status.loggedIn = false;
						state.user = null;
				},
				loginSuccess(state, user) {
						state.status.loggedIn = true;
						state.user = user;
				},
				loginFailure(state) {
						state.status.loggedIn = false;
						state.user = null;
				},
				logout(state) {
						state.status.loggedIn = false;
						state.user = null;
				}
		}
};
