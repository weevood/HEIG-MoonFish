import http from '@/http'

class TeamsService {

		/**
		 * get
		 *
		 * @param {uuid} uuid the teams uuid
		 * @return {Promise<unknown>}
		 */
		get(uuid) {
				return http.get(`/teams/${ uuid }`)
		}

		/**
		 * getAll
		 *
		 * @param {int} status
		 * @return {Promise<AxiosResponse<any>>}
		 */
		getAll(status) {
				let endpoint = '/teams'
				if (status) {
						endpoint += `?filters[status]=${ status }`
				}
				return http.get(endpoint)
		}

		/**
		 * getMine
		 *
		 * @return {Promise<AxiosResponse<any>>}
		 */
		getMine() {
				return http.get('/profile/teams')
		}

		/**
		 * getMembers
		 *
		 * @param {uuid} uuid the teams uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		getMembers(uuid) {
				return http.get(`/teams/${ uuid }/members`)
		}

		/**
		 * getProjects
		 *
		 * @param {uuid} uuid the teams uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		getProjects(uuid) {
				return http.get(`/teams/${ uuid }/projects`)
		}

		create(data) {
				return http.post('/teams', data)
		}

		update(uuid, data) {
				return http.patch(`/teams/${ uuid }`, data)
		}

		delete(uuid) {
				return http.delete(`/teams/${ uuid }`)
		}

		join(uuid) {
				return http.put(`/teams/${ uuid }/join`)
		}

		leave(uuid) {
				return http.put(`/teams/${ uuid }/leave`)
		}

		accept(teamUuid, userUuid) {
				return http.put(`/teams/${ teamUuid }/users/:${ userUuid }/accept`)
		}

		ban(teamUuid, userUuid) {
				return http.put(`/teams/${ teamUuid }/users/:${ userUuid }/ban`)
		}

		giveOwnership(teamUuid, userUuid) {
				return http.put(`/teams/${ teamUuid }/users/:${ userUuid }/giveOwnership`)
		}

}

export default new TeamsService()
