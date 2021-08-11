import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Verify from './components/Verify.vue';
import Forgot from './components/Forgot.vue';
import Reset from './components/Reset.vue';

// Then, lazy-loaded components
const Profile = () => import('./components/Profile.vue')
const BoardAdmin = () => import('./components/BoardAdmin.vue')
const BoardModerator = () => import('./components/BoardModerator.vue')
const BoardUser = () => import('./components/BoardUser.vue')

const routes = [
		{
				path: '/',
				name: 'login',
				component: Login
		},
		{
				path: '/login',
				component: Login
		},
		{
				path: '/register',
				component: Register
		},
		{
				path: '/verify/:uuid',
				component: Verify
		},
		{
				path: '/forgot',
				component: Forgot
		},
		{
				path: '/reset/:uuid',
				component: Reset
		},
		// Then, lazy-loaded components
		{
				path: '/profile',
				name: 'profile',
				component: Profile
		},
		{
				path: '/admin',
				name: 'admin',
				component: BoardAdmin
		},
		{
				path: '/moderator',
				name: 'moderator',
				component: BoardModerator
		},
		{
				path: '/user',
				name: 'user',
				component: BoardUser
		},
];

const router = createRouter({
		history: createWebHistory(),
		routes,
});

router.beforeEach((to, from, next) => {
		const publicPages = ['/register', '/login', '/forgot', '/token'];
		const regex = '(.*)((verify|reset)\\/\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12})(\\?email=.*)?$';
		const authRequired = !(publicPages.includes(to.path) || to.path.match(regex));
		const loggedIn = localStorage.getItem('user');

		// trying to access a restricted page + not logged in = redirect to login page
		if (authRequired && !loggedIn) {
				next('/login');
		}
		else {
				next();
		}
});

export default router;