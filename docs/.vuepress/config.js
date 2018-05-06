module.exports = {
    title: 'Atom UI',
    description: '更快更简单!',
    themeConfig: {
        editLinks: true,
        sidebar: [{
                title: '开始',
                collapsable: false,
                children: [
                    '/'
                ]
            },
            {
                title: '组件',
                collapsable: false,
                children: [
                    '/components/'
                ]
            }
        ]
    }
}