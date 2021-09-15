class CacheService {

		/**
		 * get  Retrieve an item in cache
		 *
		 * @param {string} key the key to look for in cache
		 * @return {any}
		 */
		get(key) {
				return JSON.parse(localStorage.getItem(key))
		}

		/**
		 * set  Set item in local storage
		 *
		 * @param {string} key
		 * @param {any} value
		 */
		set(key, value) {
				localStorage.setItem(key, JSON.stringify(value))
		}

		/**
		 * del  Remove an item in local storage
		 *
		 * @param {string} key the key of the item to remove
		 */
		del(key) {
				localStorage.removeItem(key)
		}

		/**
		 * flush  Remove all cached keys
		 */
		flush() {
				['myTeams', 'myProjects'].forEach(key => this.del(key))
		}

}

export default new CacheService()
