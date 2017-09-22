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

export default new Router({
    // mode: "history",
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            name: 'Index',
            path: '/index',
            component: Index
        },
        {
            name: 'SwitchDemo',
            path: '/switch',
            component: SwitchDemo
        }
    ]
});
