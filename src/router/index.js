import Vue from 'vue'
import Router from 'vue-router'

const Login = () => ({
    component: import ('@/pages/Login')
});

import Home from '@/pages/HomeFrame'
import Index from '@/pages/Index'
import List from '@/pages/List'
import Detail from '@/pages/Detail'

const Presale = () => ({
    component: import ('@/pages/Presale')
});

const Find = () => ({
    component: import ('@/pages/Find')
});

const ShopCart = () => ({
    component: import ('@/pages/ShopCart')
});

const My = () => ({
    component: import ('@/pages/My'),
});


Vue.use(Router)
export default new Router({
    routes: [{
        path: '/',
        redirect: '/home/index'
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [{
            path: 'index',
            name: 'Index',
            component: Index
        }, {
            path: 'list',
            name: 'List',
            component: List
        }, {
            path: 'detail',
            name: 'Detail',
            component: Detail
        }, {
            path: 'presale',
            name: 'Presale',
            component: Presale
        }, {
            path: 'find',
            name: 'Find',
            component: Find
        }, {
            path: 'shop-cart',
            name: 'ShopCart',
            component: ShopCart
        }, {
            path: 'my',
            name: 'My',
            component: My
        }]
    }]
})
