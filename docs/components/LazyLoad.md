## Input
输入框, 支持v-model

### 基本使用
``` html
<!-- 默认宽度为100% -->
<v-lazy-load :src="url"/>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| src | 图片地址 | `String` | - |-|是|
| placeholder | 未加载前等待图 | `String` | 1*1的svg |-|否|
| placeholderBackgroundColor | 未加载前等待图颜色(前提placeholder是默认值) | `String` | #eee |-|否|
| throttleTime | throttleTime时间内近允许触发一次加载 | `Number` | 200 |-|否|
| attempt | 失败后, 重试加载的次数| `Number` | 3 |-|否|
| errorImg | 加载失败后显示的图片| `String` | - |-|否|
| preLoadRate | 图片落在在屏幕尺寸的preLoadRate倍数范围内, 即发生加载| `Number` | 1.3 |-|否|
| events | 监听最近的带滚动父元素的这些事件, 触发即发生加载| `Array` | ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'webkitAnimationend', 'webkitTransitionend', 'touchmove'] |-|否|


##### events
| 名称 | 说明 | 参数 |参数类型|
|-----------|-----------|-----------|-----------|
| loaded | 加载完成触发 | width(图片宽),height(高),url(地址),costTime(加载用时) |`Object`|
| attempt | 发生重新加载触发 | url,costTime |`Object`|
| fail | 发生重新加载attempt次后失败触发 | url,costTime |`Object`|

