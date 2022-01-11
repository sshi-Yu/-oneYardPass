import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    routes: [{
        name: 'login',
        component: () => import('@/pages/Login/m-login'),
        path: '/m-login'
    }],

})

router.beforeEach((to, from, next) => {
    console.log(to,from)
    if (/m-/.test(from.path)) {
        next({
            ...to,
            path: 'm-' + to.path
        })
    }
})

export default router;