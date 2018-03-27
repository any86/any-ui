## Affix

### 基本使用

在任意组件内部可通过this.$alert方法调用
``` javascript
{
    methods: {
        clickHandle(){
            this.$alert('hello world');
        }
    }
}
```

### 高级用法

通过第二个参数, 可以进一步定制alert.
``` javascript
{
    methods: {
        clickHandle(){
            this.$alert('hello world', {
                title: '系统提示',
                align: 'top',
                onOk(){
                    // 点击确定按钮后触发 
                }
            });
        }
    }
}
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| offsetTop | 触发高度 | `Number` | 0 |-|否|
| events | 监听的事件 | `Array` | ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'webkitAnimationend', 'webkitTransitionend', 'touchmove'] |-|否|

##### events

| 名称 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| change | 固定状态变更时触发 | 是否固定[`Boolean`] |