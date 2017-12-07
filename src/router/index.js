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
import ButtonGroupDemo from '@/pages/ButtonGroupDemo';

// 对话框
import AlertDemo from '@/pages/AlertDemo';
import ConfirmDemo from '@/pages/ConfirmDemo';
import PromptDemo from '@/pages/PromptDemo';
import PopupDemo from '@/pages/PopupDemo';
import DialogDemo from '@/pages/DialogDemo';
import MaskDemo from '@/pages/MaskDemo';

// 容器
import ScrollViewDemo from '@/pages/ScrollViewDemo';
import VirtualScrollerDemo from '@/pages/VirtualScrollerDemo';

// 
import TabsDemo from '@/pages/TabsDemo';


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
        },{
            name: 'buttonGroup',
            path: '/demos/button-group',
            component: ButtonGroupDemo
        },{
            name: 'alert',
            path: '/demos/alert',
            component: AlertDemo
        },
        {
            name: 'confirm',
            path: '/demos/confirm',
            component: ConfirmDemo
        },
        {
            name: 'prompt',
            path: '/demos/prompt',
            component: PromptDemo
        },{
            name: 'popup',
            path: '/demos/popup',
            component: PopupDemo
        },{
            name: 'dialog',
            path: '/demos/dialog',
            component: DialogDemo
        },{
            name: 'mask',
            path: '/demos/mask',
            component: MaskDemo
        },{
            name: 'scrollView',
            path: '/demos/scroll-view',
            component: ScrollViewDemo
        },{
            name: 'virtual-scroller',
            path: '/demos/virtual-scroller',
            component: VirtualScrollerDemo
        },{
            name: 'tabs',
            path: '/demos/tabs',
            component: TabsDemo
        },
        
    ]
});
