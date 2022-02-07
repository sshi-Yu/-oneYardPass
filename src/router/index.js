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
        {
            name: 'm-main',
            component: () => import('@/pages/Main/m-main'),
            path: '/m-main',
            children: [
                {
                    component: () => import('@/pages/Subscribe/m-subscribe'),
                    path: 'm-subscribe'
                },
                {
                    component: () => import('@/pages/Detail/m-detail'),
                    path: 'm-detail'
                },
                {
                    component: () => import('@/pages/SubscribeList/m-subscribeList'),
                    path: 'm-subscribeList',
                },
                {   
                    name: 'toCheckQRcode',
                    component: () => import('@/pages/QRcode/m-QRcode'),
                    path: 'm-QRcode/:subscribeId/:auditStatus',
                },
                {
                    name: 'm-userCenter',
                    component: () => import('@/pages/UserCenter/m-userCenter'),
                    path: 'm-userCenter'
                }
            ]
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