import http from '@/config/http';
import clean from '@/utils/clean';

/**
 * ResourcesService
 *
 * Define all available routes for "Resources"
 */
class ResourcesService {

		/**
		 * get  Retrieve a resource by its uuid
		 *
		 * @param {uuid} uuid the teams uuid
		 * @return {Promise<unknown>}
		 */
		get(uuid) {
				return http.get(`/resources/${ uuid }`)
		}

		/**
		 * getAll   Get all resources, optionally with a specified privacy
		 *
		 * @param {int} privacy
		 * @return {Promise<AxiosResponse<any>>}
		 */
		getAll(privacy = 0) {
				let endpoint = '/resources'
				if (privacy) {
						endpoint += `?filters[privacy]=${ privacy }`
				}
				return http.get(endpoint)
		}

		/**
		 * create   Create a new resource
		 *
		 * @param {Object} data the new resource data
		 * @return {Promise<AxiosResponse<any>>}
		 */
		create(data) {
				return http.post('/resources', clean(data))
		}

		/**
		 * update   Update a resource data
		 *
		 * @param {Object} resource the resource data to update
		 * @return {Promise<AxiosResponse<any>>}
		 */
		update(resource) {
				return http.patch(`/resources/${ resource.uuid }`, clean(resource))
		}

		/**
		 * delete   Remove definitely a resource
		 *
		 * @param {uuid} uuid the resource uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		delete(uuid) {
				return http.delete(`/resources/${ uuid }`)
		}

}

export default new ResourcesService()
