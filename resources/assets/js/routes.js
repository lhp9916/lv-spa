import VueRouter from 'vue-router'

let routes = [
    {
        path: '/',
        component: require('./components/pages/Home')
    }, {
        path: '/about',
        component: require('./components/pages/About')
    }, {
        path: '/posts/:id',
        name: 'posts',
        component: require('./components/posts/Post')
    }, {
        path: '/register',
        component: require('./components/register/Register')
    }, {
        path: '/confirm',
        name: 'confirm',
        component: require('./components/comfirm/Email')
    },{
        path: '/login',
        component: require('./components/login/Login')
    }
]

export default new VueRouter({
    mode: 'history',//去掉地址栏中 # 号
    routes
})