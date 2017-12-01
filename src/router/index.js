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
import TextareaDemo from '@/pages/TextareaDemo';
import RadioDemo from '@/pages/RadioDemo';
import CheckboxDemo from '@/pages/CheckboxDemo';
import PickerDemo from '@/pages/PickerDemo';
import CountDemo from '@/pages/CountDemo';
import ButtonDemo from '@/pages/ButtonDemo';



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
        }, {
            name: 'textarea',
            path: '/demos/textarea',
            component: TextareaDemo
        }, {
            name: 'radio',
            path: '/demos/radio',
            component: RadioDemo
        }, {
            name: 'checkbox',
            path: '/demos/checkbox',
            component: CheckboxDemo
        },
        {
            name: 'picker',
            path: '/demos/picker',
            component: PickerDemo
        },
        {
            name: 'count',
            path: '/demos/count',
            component: CountDemo
        },
        {
            name: 'button',
            path: '/demos/button',
            component: ButtonDemo
        },

    ]
});
