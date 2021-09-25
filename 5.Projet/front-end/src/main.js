import './assets/tailwind.css';    // A utility-first CSS framework for rapidly building custom user interfaces.
import i18n from '@/config/i18n';   // Lightweight simple translation module with dynamic JSON storage.
import { FontAwesomeIcon } from './assets/font-awesome'; // Font Awesome is a full suite of 675 pictographic icons.
import App from './App.vue';
import router from './router';
import store from './store';
import { createApp } from 'vue';

createApp(App)
		.use(router)
		.use(store)
		.use(i18n)
		.component('font-awesome-icon', FontAwesomeIcon)
		.mount('#app');
