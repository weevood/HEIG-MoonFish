import http from '@/http'
import CacheService from '@/services/cache.service';
import { STATUS_ACTIVE, STATUS_BANNED, STATUS_INACTIVE } from "@/enums/status";
import clean from "@/utils/clean";

class TeamsService {

		/**
		 * get  Retrieve a team by its uuid
		 *
		 * @param {uuid} uuid the teams uuid
		 * @return {Promise<unknown>}
		 */
		get(uuid) {
				return http.get(`/teams/${ uuid }`)
		}

		/**
		 * getAll   Get all teams, optionally with a specified status
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
		 * getMine  Retrieve all teams linked to the connected user§
		 *
		 * @return {Promise<{STATUS_INACTIVE: *[], STATUS_BANNED: *[], STATUS_ACTIVE: *[]}>}
		 */
		getMine() {
				return CacheService.get('myTeams') || http.get('/profile/teams').then((teams) => {
						let myTeams = { STATUS_ACTIVE: [], STATUS_INACTIVE: [], STATUS_BANNED: [], OWNERSHIP: [] };
						for (const team of teams) {
								if (team.status !== STATUS_ACTIVE) {
										continue;
								}
								switch (team.relation.status)
								{
										case STATUS_INACTIVE:
												myTeams.STATUS_INACTIVE.push(team)
												break
										case STATUS_ACTIVE:
												if (team.relation.isOwner) {
														myTeams.STATUS_ACTIVE.unshift(team)
														myTeams.OWNERSHIP.push(team)
												}
												else {
														myTeams.STATUS_ACTIVE.push(team)
												}
												break
										case STATUS_BANNED:
												myTeams.STATUS_BANNED.push(team)
												break
								}
						}
						CacheService.set('myTeams', myTeams)
						return myTeams;
				})
		}

		/**
		 * getMembers   Retrieve all members of a team
		 *
		 * @param {uuid} uuid the team uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		getMembers(uuid) {
				return http.get(`/teams/${ uuid }/users`)
		}

		/**
		 * getProjects  Retrieve all projects of a team (mandates and develops ones)
		 *
		 * @param {uuid} uuid the team uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		getProjects(uuid) {
				return http.get(`/teams/${ uuid }/projects`)
		}

		/**
		 * create   Create a new team
		 *
		 * @param {Object} data the new team data
		 * @return {Promise<AxiosResponse<any>>}
		 */
		create(data) {
				CacheService.del('myTeams');
				return http.post('/teams', clean(data))
		}

		/**
		 * update   Update a team data
		 *
		 * @param {Object} team the team data to update
		 * @return {Promise<AxiosResponse<any>>}
		 */
		update(team) {
				return http.patch(`/teams/${ team.uuid }`, clean(team))
		}

		/**
		 * delete   Remove definitely a team
		 *
		 * @param {uuid} uuid the team uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		delete(uuid) {
				CacheService.del('myTeams');
				return http.delete(`/teams/${ uuid }`)
		}

		/**
		 * join     Leave a team
		 *
		 * @param {uuid} uuid the team uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		join(uuid) {
				CacheService.del('myTeams');
				return http.put(`/teams/${ uuid }/join`)
		}

		/**
		 * leave    Join a team
		 *
		 * @param {uuid} uuid the team uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		leave(uuid) {
				CacheService.del('myTeams');
				return http.put(`/teams/${ uuid }/leave`)
		}

		/**
		 * accept   Accept a user request
		 *
		 * @param {uuid} teamUuid the team uuid
		 * @param {uuid} userUuid the member uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		accept(teamUuid, userUuid) {
				return http.patch(`/teams/${ teamUuid }/users/${ userUuid }`, { action: 'accept' })
		}

		/**
		 * ban  Ban a user definitely
		 *
		 * @param {uuid} teamUuid the team uuid
		 * @param {uuid} userUuid the member uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		ban(teamUuid, userUuid) {
				return http.patch(`/teams/${ teamUuid }/users/${ userUuid }`, { action: 'ban' })
		}

		/**
		 * giveOwnership    Transfer ownership to another team member
		 *
		 * @param {uuid} teamUuid the team uuid
		 * @param {uuid} userUuid the member uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		giveOwnership(teamUuid, userUuid) {
				CacheService.del('myTeams');
				return http.patch(`/teams/${ teamUuid }/users/${ userUuid }`, { action: 'giveOwnership' })
		}

}

export default new TeamsService()
