import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    routes: [
        {
            name: 'm-login',
            component: () => import('@/pages/Login/m-login'),
            path: '/m-login',
        },
        {
            name: 'pc-login',
            component: () => import('@/pages/Login/pc-login'),
            path: '/pc-login'
        },
        {
            name: 'm-regist',
            component: () => import('@/pages/Regist/m-regist'),
            path: '/m-regist'
        },
        {
            name: 'pc-regist',
            component: () => import('@/pages/Regist/pc-regist'),
            path: '/pc-regist'
        },
    ],

})

/* router.beforeEach((to, from, next) => {
    console.log(to,from)
    if (/m-/.test(from.path)) {
        next({
            ...to,
            path: 'm-' + to.path
        })
    }
})
 */
export default router;