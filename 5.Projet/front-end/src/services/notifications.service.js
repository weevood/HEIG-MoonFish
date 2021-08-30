import http from '@/http';
import clean from "@/utils/clean";

class NotificationsService {

		/**
		 * get  Retrieve a notification by its uuid
		 *
		 * @param {uuid} uuid the teams uuid
		 * @return {Promise<unknown>}
		 */
		get(uuid) {
				return http.get(`/notifications/${ uuid }`);
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
		getMine() {
				const user = JSON.parse(localStorage.getItem('user'))
				if (user && user.user && user.user.uuid) {
						// TODO orders[updatedAt
						return http.get(`/notifications?orders[updatedAt]=DESC&filters[userUuid]=${ user.user.uuid }`)
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

export default new NotificationsService();
