import Vue from 'vue';
import { checkAuth } from './shared';
import { router } from './shared/router';

const app = new Vue({
    el: '#app',
    router,
});

checkAuth();
