import http from '@/http'
import clean from "@/utils/clean";

class ProfileService {

		/**
		 * get  Retrieve my profile
		 *
		 * @return {Promise<unknown>}
		 */
		get() {
				return http.get(`/profile`)
		}

		/**
		 * update   Update my profile data
		 *
		 * @param {Object} data the data to update
		 * @return {Promise<AxiosResponse<any>>}
		 */
		update(data) {
				return http.patch(`/profile`, clean(data))
		}

		/**
		 * updatePwd   Update my password
		 *
		 * @param {Object} data the old and the new password
		 * @return {Promise<AxiosResponse<any>>}
		 */
		updatePwd(data) {
				return http.patch(`/profile/password`, data)
		}

}

export default new ProfileService()
