import clean from '@/utils/clean';
import http from '@/config/http';

/**
 * NotificationsService
 *
 * Define all available routes for "Notifications"
 */
class NotificationsService {

		/**
		 * get  Retrieve a notification by its uuid
		 *
		 * @param {uuid} uuid the teams uuid
		 * @return {Promise<unknown>}
		 */
		get(uuid) {
				return http.get(`/notifications/${ uuid }`)
		}

		/**
		 * getAll   Get all notifications, optionally with a specified priority
		 *
		 * @param {int} priority
		 * @return {Promise<AxiosResponse<any>>}
		 */
		getAll(priority = 0) {
				let endpoint = '/notifications'
				if (priority) {
						endpoint += `?filters[priority]=${ priority }`
				}
				return http.get(endpoint)
		}

		/**
		 * getMine  Retrieve all notifications linked to the connected user
		 *
		 * @return {*[]|Promise<AxiosResponse<any>>}
		 */
		getMine(archived = false) {
				const user = JSON.parse(localStorage.getItem('user'))
				let endpoint = `/notifications?filters[userUuid]=${ user.user.uuid }`
				endpoint += (archived ? '&orders[createdAt]=DESC&limit=50' : '&orders[updatedAt]=DESC&filters[read]=0')
				if (user && user.user && user.user.uuid) {
						return http.get(endpoint)
				}
				return []
		}

		/**
		 * create   Create a new notification
		 *
		 * @param {Object} data the new notification data
		 * @return {Promise<AxiosResponse<any>>}
		 */
		create(data) {
				return http.post('/notifications', clean(data))
		}

		/**
		 * update   Update a notification data
		 *
		 * @param {Object} notification the notification data to update
		 * @return {Promise<AxiosResponse<any>>}
		 */
		update(notification) {
				return http.patch(`/notifications/${ notification.uuid }`, clean(notification))
		}

		/**
		 * delete   Remove definitely a notification
		 *
		 * @param {uuid} uuid the notification uuid
		 * @return {Promise<AxiosResponse<any>>}
		 */
		delete(uuid) {
				return http.delete(`/notifications/${ uuid }`)
		}

}

export default new NotificationsService()
