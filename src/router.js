import { createRouter, createWebHistory} from 'vue-router';

import UserSignIn from './pages/authentification/UserSignUp.vue';
import UserSignUp from './pages/authentification/UserSignIn.vue';
import Dashboard from './pages/dashboard/TheDashboard.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/signin'},
        { path: '/dashboard', component: Dashboard},
        { path: '/signin', component: UserSignIn},
        { path: '/signup', component: UserSignUp}
    ]
})

export default router