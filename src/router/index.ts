import { createRouter, createWebHistory } from 'vue-router';
import CharactersVue from '@/views/Characters.vue';
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: '/characters',
		},
		{
			path: '/characters',
			name: 'characters',
			component: CharactersVue,
		},
		{
			path: '/characters/:id',
			name: 'details',
			component: () => import('@/views/CharacterDetails.vue'),
		},
	],
});

export default router;
