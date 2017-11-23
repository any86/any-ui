import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// 定义路由
const Index = () => ({
    component: import('@/pages/Index')
});

const SwitchDemo = () => ({
    component: import('@/pages/SwitchDemo')
});

const CollapseDemo = () => ({
    component: import('@/pages/CollapseDemo')
});


export default new Router({
    // mode: "history",
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: Index
        },
        {
            path: '/demos/switch',
            component: SwitchDemo
        }, {
            path: '/demos/collapse',
            component: CollapseDemo
        },
    ]
});
