import http from '@/config/http';

/**
 * RecommendationsService
 *
 * Define all available routes for "Recommendations"
 */
class RecommendationsService {

		/**
		 * getProjects  Retrieve recommended projects
		 *
		 * @param {int} limit the maximum number of project to render
		 * @return {Promise<unknown>}
		 */
		getProjects(limit = 10) {
				return http.get(`/recommendations/projects?limit=${ limit }`)
		}

}

export default new RecommendationsService()
