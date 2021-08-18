import http from '@/http';
import genUuid from "@/utils/genUuid";

const teams = [
		{ uuid: genUuid(), name: 'Blue Team', color: 'blue', ownerUuid: '2ce7e518-078d-4b82-970d-fb8b9e95b144', status },
		{ uuid: genUuid(), name: 'Red Team', color: 'red' },
		{ uuid: genUuid(), name: 'Yellow Team', color: 'yellow' },
		{ uuid: genUuid(), name: 'Purple Team', color: 'purple' },
		{ uuid: genUuid(), name: 'Green Team', color: 'green' }
];

const members = [
		{ uuid: "2ce7e518-078d-4b82-970d-fb8b9e95b144", firstName: "Thibaud", lastName: "Alt", phone: "+41 (0) 76 415 01 24", },
		{ uuid: "2ce7e518-078d-4b82-970d-ffweweffwewf", firstName: "Jean", lastName: "Poche", phone: "+41 (0) 12 415 35 24", },
		{ uuid: "2ce7e518-078d-4b82-970d-zhh545hh45h4", firstName: "Jules", lastName: "Tartempion", phone: "+41 (0) 76 415 01 24", }
];

class TeamsService {

		// eslint-disable-next-line no-unused-vars
		getAll(status) {

				return new Promise((resolve) => {
						resolve(teams)
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
		getMine(uuid, fields) {
				return new Promise((resolve) => {
						if (fields === 'uuid') {
								resolve({
										STATUS_ACTIVE: [teams[0]['uuid'], teams[2]['uuid']],
										STATUS_INACTIVE: [teams[1]['uuid']],
										STATUS_BANNED: [teams[3]['uuid']],
								})
						}
						resolve({
								STATUS_ACTIVE: [teams[0], teams[2]],
								STATUS_INACTIVE: [teams[1]],
								STATUS_BANNED: [teams[3]],
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
						resolve(teams[0])
				});
				// return http.get(`/teams/${ uuid }`);
		}

		// eslint-disable-next-line no-unused-vars
		getMembers(uuid) {
				return new Promise((resolve) => {
						resolve({
								STATUS_ACTIVE: [members[0], members[1]],
								STATUS_INACTIVE: [members[2]],
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
