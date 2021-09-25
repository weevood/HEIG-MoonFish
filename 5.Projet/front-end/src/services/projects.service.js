import CacheService from '@/services/cache.service';
import clean from '@/utils/clean';
import http from '@/config/http';
import { PROJECT_STATUS_BANNED } from '@/enums/projectStatus';
import { RELATION_APPLIES, RELATION_ARBITRATES, RELATION_DEVELOPS, RELATION_MANDATES } from '@/enums/relations';

/**
 * ProjectsService
 *
 * Define all available routes for "Projects"
 */
class ProjectsService {

		/**
		 * get  Retrieve a project by its uuid
		 *
		 * @param {uuid} uuid the teams uuid
		 * @return {Promise<unknown>}
		 */
		get(uuid) {
				return http.get(`/projects/${ uuid }`)
		}

		/**
		 * getAll   Get all projects, optionally with a specified status
		 *
		 * @param {Array} options
		 * @return {Promise<AxiosResponse<any>>}
		 */
		getAll(options = []) {
				let endpoint = '/projects'
				for (let i = 0; i < options.length; i++) {
						endpoint += (i ? '&' : '?') + options[i]
				}
				return http.get(endpoint)
		}

		/**
		 * getMine  Retrieve all projects linked to the connected user
		 *
		 * @return {Promise<{STATUS_INACTIVE: *[], STATUS_BANNED: *[], STATUS_ACTIVE: *[]}>}
		 */
		getMine() {
				return CacheService.get('myProjects') || http.get('/profile/projects').then((projects) => {
						let myProjects = {
								RELATION_APPLIES: [],
								RELATION_ARBITRATES: [],
								RELATION_DEVELOPS: [],
								RELATION_MANDATES: []
						};
						for (const project of projects) {
								if (project.status === PROJECT_STATUS_BANNED) {
										continue;
								}
								switch (project.relation.name)
								{
										case RELATION_APPLIES:
												myProjects.RELATION_APPLIES.push(project)
												break
										case RELATION_ARBITRATES:
												myProjects.RELATION_ARBITRATES.push(project)
												break
										case RELATION_DEVELOPS:
												myProjects.RELATION_DEVELOPS.push(project)
												break
										case RELATION_MANDATES:
												myProjects.RELATION_MANDATES.push(project)
												break
								}
						}
						CacheService.set('myProjects', myProjects)
						return myProjects;
				})
		}

		/**
		 * getTeams   Retrieve all teams of a project
		 *
		 * @param {uuid} uuid the project uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		getTeams(uuid) {
				return http.get(`/projects/${ uuid }/teams`)
		}

		/**
		 * getResources   Retrieve all resources of a project
		 *
		 * @param {uuid} uuid the project uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		getResources(uuid) {
				return http.get(`/projects/${ uuid }/resources`)
		}

		/**
		 * create   Create a new project
		 *
		 * @param {Object} data the new project data
		 * @return {Promise<AxiosResponse<any>>}
		 */
		create(data) {
				CacheService.del('myProjects')
				return http.post('/projects', clean(data))
		}

		/**
		 * update   Update a project data
		 *
		 * @param {Object} project the project data to update
		 * @return {Promise<AxiosResponse<any>>}
		 */
		update(project) {
				CacheService.del('myProjects')
				return http.patch(`/projects/${ project.uuid }`, clean(project))
		}

		/**
		 * delete   Remove definitely a project
		 *
		 * @param {uuid} uuid the project uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		delete(uuid) {
				CacheService.del('myProjects')
				return http.delete(`/projects/${ uuid }`)
		}

		/**
		 * apply    Apply for a project
		 *
		 * @param {uuid} projectUuid the project uuid
		 * @param {Object} data the candidature data
		 * @return {Promise<AxiosResponse<any>>}
		 */
		apply(projectUuid, data) {
				CacheService.del('myProjects')
				return http.put(`/projects/${ projectUuid }/apply`, data)
		}

		/**
		 * accept   Accept a team candidature
		 *
		 * @param {uuid} projectUuid the project uuid
		 * @param {uuid} teamUuid the team uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		accept(projectUuid, teamUuid) {
				return http.put(`/projects/${ projectUuid }/develop`, { teamUuid })
		}

		/**
		 * feedback   Feedback and give a mark
		 *
		 * @param {uuid} projectUuid the project uuid
		 * @param {Object} data the feedback data
		 * @return {Promise<AxiosResponse<any>>}
		 */
		feedback(projectUuid, data) {
				return http.put(`/projects/${ projectUuid }/feedback`, data)
		}

}

export default new ProjectsService()
