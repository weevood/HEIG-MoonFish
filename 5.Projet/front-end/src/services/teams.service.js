import http from '@/http';
// import handleError from '@/services/handleError';

class TeamsService {

		getAll(status) {
				return new Promise((resolve) => {
						if (status) {
								http
										.get(`/teams?filters[status]=${ status }`)
										.then(data => resolve(data))
										// .catch(err => reject(handleError(err)));
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
