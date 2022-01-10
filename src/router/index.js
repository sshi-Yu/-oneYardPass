import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [
        {
            name: 'login',
            component: ()=> import('@/pages/Login'),
            path: '/login'
        }
    ]
})
