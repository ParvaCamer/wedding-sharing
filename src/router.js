import { createRouter, createWebHistory } from 'vue-router';

import UserSignIn from './pages/authentification/UserSignIn.vue';
import UserSignUp from './pages/authentification/UserSignUp.vue';
import Dashboard from './pages/dashboard/TheDashboard.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/signin' },
        { path: '/dashboard/:id/:userstatus', component: Dashboard },
        { path: '/signin', component: UserSignIn },
        { path: '/signup', component: UserSignUp },
        { path: '/:notFound(.*)', component: NotFound }
    ]
})

export default router