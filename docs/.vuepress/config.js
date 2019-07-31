module.exports = {
    demoURL: 'https://any86.github.io/any-ui/demo/',
    base: '/any-ui/',
    dest: './docs/dist',
    title: 'Any UI',
    description: '更快更简单!',
    themeConfig: {

        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'any-ui',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: 'GitHub',

        // 假如你的文档仓库和项目本身不在一个仓库：
        docsRepo: 'any-ui',
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'master',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '帮助我们改善此页面！',

        lastUpdated: '上一次更新时间', // string | boolean
        editLinks: true,
        sidebarDepth: 0,
        sidebar: [{
                title: '开始',
                collapsable: false,
                children: [
                    '/install'
                ]
            },
            {
                title: '指令',
                collapsable: false,
                children: [
                    '/directives/touch',
                    // '/directives/ripple'
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
            },
            {
                title: '全局方法(3)',
                collapsable: false,
                children: [
                    '/components/$loading',
                    '/components/$toast',
                    '/components/$picker',
                ]
            }
        ],

        nav: [
            // {
            //     text: 'github',
            //     link: 'https://github.com/any-ui'
            // },
            // {
            //     text: 'Guide',
            //     link: '/guide/'
            // },
            // {
            //     text: 'External',
            //     link: 'https://google.com'
            // },
        ]
    }
}