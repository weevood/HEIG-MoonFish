import http from '@/http';

function handleError(error) {
		if (error.response) {
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
}

class TeamsService {

		getAll(status) {
				return new Promise((resolve, reject) => {
						if (status) {
								http
										.get(`/teams?filters[status]=${ status }`)
										.then(data => resolve(data))
										.catch(err => reject(handleError(err)));
						}
						else {
								return http.get(`/teams`);
						}
				});

		}

		get(uuid) {
				return http.get(`/teams/${ uuid }`);
		}

		create(data) {
				return http.post('/teams', data);
		}

		update(uuid, data) {
				return http.patch(`/teams/${ uuid }`, data);
		}

		delete(uuid) {
				return http.delete(`/teams/${ uuid }`);
		}

}

export default new TeamsService();
