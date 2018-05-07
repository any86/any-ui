module.exports = {
    base: '/atom-ui/',
    dest: './docs/dist',
    title: 'Atom UI',
    description: '更快更简单!',
    themeConfig: {
        editLinks: true,
        sidebarDepth:0,
        sidebar: [{
                title: '开始',
                collapsable: false,
                children: [
                    '/'
                ]
            },
            {
                title: '组件(34)',
                collapsable: false,
                children: [
                    '/components/Affix',
                    '/components/Alert',
                    '/components/Badge',
                    '/components/Breadcrumb',
                    '/components/Button',
                    '/components/ButtonGroup',
                    '/components/Carousel',
                    '/components/Cell',
                    '/components/Checkbox',
                    '/components/Collapse',
                    '/components/Confirm',
                    '/components/Counter',
                    '/components/Dialog',
                    '/components/Group',
                    '/components/Icon',
                    '/components/Input',
                    '/components/LazyLoad',
                    '/components/Loading',
                    '/components/Mask',
                    '/components/Picker',
                    '/components/Popper',
                    '/components/Popup',
                    '/components/PopupPicker',
                    '/components/Prompt',
                    '/components/Radio',
                    '/components/Range',
                    '/components/Rate',
                    '/components/Segment',
                    '/components/Steps',
                    '/components/SwipeOut',
                    '/components/Switch',
                    '/components/Tabs',
                    '/components/Textarea',
                ]
            }
        ],

        // nav: [{
        //         text: '组件',
        //         link: '/components'
        //     },
        //     {
        //         text: 'Guide',
        //         link: '/guide/'
        //     },
        //     {
        //         text: 'External',
        //         link: 'https://google.com'
        //     },
        // ]
    }
}