import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// 定义路由
const Index = () => ({
    component: import('@/pages/Index')
});

const Demo = () => ({
    component: import('@/pages/Demo')
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
            path: '/demo',
            name: 'Demo',
            component: Demo
        }
    ]
});
