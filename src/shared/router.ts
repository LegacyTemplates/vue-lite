import Router from 'vue-router';
import { Home } from '../components/Home';
import { About } from '../components/About';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';
import { RouteConfig } from 'vue-router';

const routes:RouteConfig[] = [
    { path: '/', component: Home as any },
    { path: '/about', component: About },
    { path: '/login', component: SignIn, props: (route) => ({ redirect: route.query.redirect }) },
    { path: '/signup', component: SignUp },
    //{ path: '*', redirect: '/' },
];

export const router = new Router ({
    mode: 'history',
    linkActiveClass: 'active',
    routes,
});

export const redirect = (path:string) => {
    const externalUrl = path.indexOf('://') >= 0;
    if (!externalUrl) {
        router.push({ path });
    } else {
        location.href = path;
    }
}
