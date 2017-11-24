import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// 定义路由
import Index from '@/pages/Index';
const SwitchDemo = () => ({
    component: import('@/pages/SwitchDemo')
});

import InputDemo from '@/pages/InputDemo';
import CollapseDemo from '@/pages/CollapseDemo';


export default new Router({
    // mode: "history",
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            name: 'index',
            path: '/index',
            component: Index
        },
        {
            name: 'switch',
            path: '/demos/switch',
            component: SwitchDemo
        }, {
            name: 'collapse',
            path: '/demos/collapse',
            component: CollapseDemo
        }, {
            name: 'input',
            path: '/demos/input',
            component: InputDemo
        },
        
    ]
});
