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

const RadioDemo = () => ({
    component: import('@/pages/RadioDemo')
});

const CheckboxDemo = () => ({
    component: import('@/pages/CheckboxDemo')
});

// const SliderDemo = () => ({
//     component: import('@/pages/SliderDemo')
// });

import SwiperDemo from '@/pages/SwiperDemo';
import TabsDemo from '@/pages/TabsDemo';
import PopperDemo from '@/pages/PopperDemo';
import LazyLoadDemo from '@/pages/LazyLoadDemo';
import StepsDemo from '@/pages/StepsDemo';
import CollapseDemo from '@/pages/CollapseDemo';


const SvgDemo = () => ({
    component: import('@/pages/SvgDemo')
});
const Test = () => ({
    component: import('@/pages/Test')
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
        },
        {
            name: 'RadioDemo',
            path: '/radio',
            component: RadioDemo
        },
        {
            name: 'CheckboxDemo',
            path: '/checkbox',
            component: CheckboxDemo
        },
        {
            name: 'SvgDemo',
            path: '/svg',
            component: SvgDemo
        },
        {
            name: 'SwiperDemo',
            path: '/swiper',
            component: SwiperDemo
        },
        {
            name: 'TabsDemo',
            path: '/tabs',
            component: TabsDemo
        },
        {
            name: 'Test',
            path: '/test',
            component: Test
        },
        {
            name: 'PopperDemo',
            path: '/popper',
            component: PopperDemo
        },
        {
            name: 'LazyLoadDemo',
            path: '/lazyload',
            component: LazyLoadDemo
        },
        {
            name: 'StepsDemo',
            path: '/steps',
            component: StepsDemo
        },
        {
            name: 'CollapseDemo',
            path: '/collapse',
            component: CollapseDemo
        }
    ]
});
