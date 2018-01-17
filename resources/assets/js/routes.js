import VueRouter from 'vue-router'
import Store from './store/index'
import jwtToken from './helpers/jwt'

let routes = [
    {
        path: '/',
        name: 'index',
        component: require('./components/pages/Home'),
        meta: {}
    }, {
        path: '/about',
        component: require('./components/pages/About'),
        meta: {}
    }, {
        path: '/posts/:id',
        name: 'posts',
        component: require('./components/posts/Post'),
        meta: {}
    }, {
        path: '/register',
        component: require('./components/register/Register'),
        meta: {requiresGuest: true}
    }, {
        path: '/confirm',
        name: 'confirm',
        component: require('./components/comfirm/Email'),
        meta: {}
    }, {
        path: '/login',
        name: 'login',
        component: require('./components/login/Login'),
        meta: {requiresGuest: true}
    }, {
        path: '/profile',
        name: 'profile',
        component: require('./components/user/Profile'),
        meta: {requiresAuth: true}
    }
]

const router = new VueRouter({
    mode: 'history',//去掉地址栏中 # 号
    routes
})

router.beforeEach((to, from, next) => {
    //是否需要验证登录
    if (to.meta.requiresAuth) {
        //判断是否登录
        if (Store.state.AuthUser.authenticated || jwtToken.getToken()) {
            return next()
        } else {
            return next({name: 'login'})
        }
    }
    if (to.meta.requiresGuest) {
        //判断是否登录
        if (Store.state.AuthUser.authenticated || jwtToken.getToken()) {
            return next({'name':'index'})
        } else {
            return next()
        }
    }

    next()
})

export default router