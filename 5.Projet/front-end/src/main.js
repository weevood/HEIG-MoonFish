import {createApp} from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import './assets/tailwind.css'
import { FontAwesomeIcon } from './assets/font-awesome'
import i18n from '@/config/i18n'

createApp(App)
		.use(router)
		.use(store)
		.use(i18n)
		.component("font-awesome-icon", FontAwesomeIcon)
		.mount('#app')
