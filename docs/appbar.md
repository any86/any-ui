## Affix

### 基本使用
放在滚动的容器中
``` html
<main style="overflow-y:scroll">
    <a-affix>
        我自动置顶
    </a-affix>
</mian>
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