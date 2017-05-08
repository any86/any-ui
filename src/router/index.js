import Vue from 'vue'
import Router from 'vue-router'

const Login = () => ({
    component: import ('@/pages/Login')
});

import Home from '@/pages/Home'
import Index from '@/pages/Index'

const Presale = () => ({
    component: import ('@/pages/Presale')
});

const Category = () => ({
    component: import ('@/pages/Category')
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
            path: 'presale',
            name: 'Presale',
            component: Presale
        }, {
            path: 'category',
            name: 'Category',
            component: Category
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
