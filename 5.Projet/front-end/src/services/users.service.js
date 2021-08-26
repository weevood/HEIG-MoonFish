import http from "@/http";

class UsersService {

		/**
		 * get  Retrieve a user by its uuid
		 *
		 * @param {uuid} uuid the user uuid
		 * @return {Promise<unknown>}
		 */
		get(uuid) {
				return http.get(`/users/${ uuid }`)
		}

		/**
		 * getTeams  Retrieve all teams linked to a user
		 *
		 * @param {uuid} uuid the user uuid
		 * @return {Promise<unknown>}
		 */
		getTeams(uuid) {
				return http.get(`/users/${ uuid }/teams`);
		}
}

export default new UsersService();
