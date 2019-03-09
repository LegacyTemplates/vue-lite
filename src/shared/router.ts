import Router from 'vue-router';
import { Home } from '../components/Home';
import { About } from '../components/About';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';
import { RouteConfig } from 'vue-router';

const routes:RouteConfig[] = [
    { path: '/', component: Home as any },
    { path: '/about', component: About },
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
    { path: '*', redirect: '/' },
];

export const router = new Router ({
    mode: 'history',
    linkActiveClass: 'active',
    routes,
});
