import http from '@/http';
import { TEAMS, PROJECTS } from "../../config/data";

class ProjectsService {

		// eslint-disable-next-line no-unused-vars
		getAll(status) {
				return new Promise((resolve) => {
						resolve(PROJECTS)
				});
				// TODO
				// if (status) {
				// 		http.get(`/projects?filters[status]=${ status }`)
				// }
				// else {
				// 		return http.get(`/projects`);
				// }
		}

		// eslint-disable-next-line no-unused-vars
		getMine(uuid, fields = '') {
				return new Promise((resolve) => {
						if (fields === 'uuid') {
								resolve({
										RELATION_APPLIES: [PROJECTS[1]['uuid']],
										RELATION_ARBITRATES: [],
										RELATION_DEVELOPS: [PROJECTS[0]['uuid'], PROJECTS[4]['uuid']],
										RELATION_MANDATES: [PROJECTS[2]['uuid']],
								})
						}
						resolve([PROJECTS[2], PROJECTS[0], PROJECTS[4]])
				});
				// return http.get(`/projects?filters[status]=${ STATUS_ACTIVE }&relations[ARBITRATES,MANDATES,DEVELOPS]=${
				// uuid }`)
		}

		// eslint-disable-next-line no-unused-vars
		getTeams(uuid, relation = '') {
				return new Promise((resolve) => {
						if (relation === 'applies') {
								resolve([TEAMS[2], TEAMS[3], TEAMS[4]])
						}
						resolve([TEAMS[0], TEAMS[1]])
				});
				// return http.get(`/projects/${ uuid }/teams?relations[relation]=${
				// uuid }`)
		}

		get(uuid) {
				return new Promise((resolve) => {
						resolve(PROJECTS.find(project => project.uuid === uuid))
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

		accept(projectUuid, teamUuid) {
				return http.put(`/projects/${ projectUuid }/users/:${ teamUuid }/accept`);
		}

}

export default new ProjectsService();
