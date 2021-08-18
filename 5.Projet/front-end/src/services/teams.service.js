import http from '@/http';
import { TEAMS, USERS } from "../../config/data";

class TeamsService {

		// eslint-disable-next-line no-unused-vars
		getAll(status) {
				return new Promise((resolve) => {
						resolve(TEAMS)
				});
				// TODO return new Promise((resolve) => {
				// 		if (status) {
				// 				http.get(`/teams?filters[status]=${ status }`).then(data => resolve(data))
				// 		}
				// 		else {
				// 				return http.get(`/teams`);
				// 		}
				// });

		}

		// eslint-disable-next-line no-unused-vars
		getMine(uuid, fields = '') {
				return new Promise((resolve) => {
						if (fields === 'uuid') {
								resolve({
										STATUS_ACTIVE: [TEAMS[0]['uuid'], TEAMS[2]['uuid']],
										STATUS_INACTIVE: [TEAMS[1]['uuid']],
										STATUS_BANNED: [TEAMS[3]['uuid']],
								})
						}
						resolve({
								STATUS_ACTIVE: [TEAMS[0], TEAMS[2]],
								STATUS_INACTIVE: [TEAMS[1]],
								STATUS_BANNED: [TEAMS[3]],
						})
				});
				// TODO let endpoint = `/teams?filters[status]=${ STATUS_ACTIVE }&relations[isMemberOf]=${ uuid }`
				// if(fields)
				// 		endpoint += `&fields=${ fields }`
				// return http.get(endpoint)
		}

		// eslint-disable-next-line no-unused-vars
		get(uuid) {
				return new Promise((resolve) => {
						console.log(uuid)
						resolve(TEAMS.find(team => team.uuid === uuid))
				});
				// return http.get(`/teams/${ uuid }`);
		}

		// eslint-disable-next-line no-unused-vars
		getMembers(uuid) {
				return new Promise((resolve) => {
						resolve({
								STATUS_ACTIVE: [USERS[0], USERS[1]],
								STATUS_INACTIVE: [USERS[2]],
								STATUS_BANNED: [],
						})
				});
				// return http.get(`/teams/${ uuid }/members`);
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

		join(uuid) {
				return http.put(`/teams/${ uuid }/join`);
		}

		leave(uuid) {
				return http.put(`/teams/${ uuid }/leave`);
		}

		accept(teamUuid, userUuid) {
				return http.put(`/teams/${ teamUuid }/users/:${ userUuid }/accept`);
		}

		ban(teamUuid, userUuid) {
				return http.put(`/teams/${ teamUuid }/users/:${ userUuid }/ban`);
		}

		giveOwnership(teamUuid, userUuid) {
				return http.put(`/teams/${ teamUuid }/users/:${ userUuid }/giveOwnership`);
		}

}

export default new TeamsService();
