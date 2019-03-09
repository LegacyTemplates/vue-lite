import Vue from 'vue';
import { checkAuth, store } from './shared';
import { router } from './shared/router';

const app = new Vue({
    el: '#app',
    router,
    data: store
} as any);

checkAuth();
