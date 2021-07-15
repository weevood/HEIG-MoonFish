import {createWebHistory, createRouter} from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

const Profile = () => import('./components/Profile.vue')

const routes = [
		{
				path: '/',
				name: 'login',
				component: Login,
		},
		{
				path: '/login',
				component: Login,
		},
		{
				path: '/register',
				component: Register,
		},
		{
				path: '/profile',
				name: 'profile',
				component: Profile,
		}
];

const router = createRouter({
		history: createWebHistory(),
		routes,
});

router.beforeEach((to, from, next) => {
		const publicPages = ['/login', '/register'];
		const authRequired = !publicPages.includes(to.path);
		const loggedIn = localStorage.getItem('user');

		// trying to access a restricted page + not logged in = redirect to login page
		if(authRequired && !loggedIn) {
				next('/login');
		}
		else {
				next();
		}
});

export default router;
