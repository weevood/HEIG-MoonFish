import http from '@/http';
import genUuid from "@/utils/genUuid";

class ProjectsService {

		getAll(status) {
				if (status) {
						http.get(`/projects?filters[status]=${ status }`)
				}
				else {
						return http.get(`/projects`);
				}
		}

		getMine(uuid) {
				return new Promise((resolve) => {
						resolve([{ uuid, title: 'Project X' }, { uuid: genUuid(), title: 'Project Y' }, { uuid: genUuid(), title: 'Project Z' }])
				});
				// return http.get(`/projects?filters[status]=${ STATUS_ACTIVE }&relations[ARBITRATES,MANDATES,DEVELOPS]=${ uuid }`)
		}

		get(uuid) {
				return new Promise((resolve) => {
						resolve({ uuid, title: 'Project X' })
				});
				// return http.get(`/projects/${ uuid }`);
		}

		create(data) {
				return http.post('/projects', data);
		}

		update(uuid, data) {
				return http.patch(`/projects/${ uuid }`, data);
		}

		delete(uuid) {
				return http.delete(`/projects/${ uuid }`);
		}

}

export default new ProjectsService();
