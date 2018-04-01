
import Home from '@views/a/main'

const routes = [{
    path: '/',
    name: 'Home',
    meta: {
        title: 'aaa'
    },
    component: Home
}, {
    path: '/b',
    name: 'bbb',
    meta: {
        title: 'bbbb'
    },
    component: (resolve) => require(['@views/b/main'], resolve)
}];

export default routes;