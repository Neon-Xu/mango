import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import iView from 'iview';

import Routers from './routers/main';
import App from './App.vue';

import 'iview/dist/styles/iview.css';
import './styles/common.css';


Vue.use(VueRouter);
Vue.use(iView);

const RouterConfig = {
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

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});