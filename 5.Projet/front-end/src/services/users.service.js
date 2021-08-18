import { TEAMS, USERS } from "../../config/data";

class UsersService {

		get(uuid) {
				return new Promise((resolve) => {
						resolve(USERS.find(user => user.uuid === uuid))
				});
				// return http.get(`/users/${ uuid }`);
		}

		// eslint-disable-next-line no-unused-vars
		getTeams(uuid) {
				return new Promise((resolve) => {
						resolve([TEAMS[0], TEAMS[1], TEAMS[3]])
				});
				// return http.get(`/users/${ uuid }/teams`);
		}
}

export default new UsersService();
