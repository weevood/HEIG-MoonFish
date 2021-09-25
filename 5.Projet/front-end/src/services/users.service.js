import http from '@/config/http';

/**
 * UsersService
 *
 * Define all available routes for "Users"
 */
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
				return http.get(`/users/${ uuid }/teams`)
		}

		/**
		 * getTeams  Retrieve all projects linked to a user
		 *
		 * @param {uuid} uuid the user uuid
		 * @return {Promise<unknown>}
		 */
		getProjects(uuid) {
				return http.get(`/users/${ uuid }/projects`)
		}
}

export default new UsersService()
