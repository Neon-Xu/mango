import "@babel/polyfill";
import Vue from 'vue';
import Vuex from 'vuex';
import iView from '@iview';
Vue.use(iView);

import {logged, asyncCheck} from './plugins/login';

import request from './utils/request';
Vue.prototype.$http = request;

import store from './stores';
import Routers from './routers/main';
import App from './App.vue';

import './filters/filters';
import './directives/role';
import './styles/common.css';

import VueRouter from 'vue-router';
import routerPlugins from './plugins/router';
Vue.use(VueRouter);
Vue.use(routerPlugins);

import socketPlugins from './plugins/socket';
Vue.use(socketPlugins);


const RouterConfig = {
    mode: 'history',
    base: '/',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

function init() {
    new Vue({
        el: '#app',
        store,
        router: router,
        render: h => h(App)
    });
}

async function boot() {
    if(logged) 
        init();
    else {
        const _account = await asyncCheck();
        if(_account) 
            init();
        else
            location.href = '/login.html'
    }
}

boot();


