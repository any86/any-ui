## Button
按钮, 支持情景色主题
### 基本使用
``` html
<!-- 默认样式 -->
<a-button>开始</a-button>
```
### 支持情景色
``` html
<!-- 默认有圆角 -->
<a-button type="success">开始</a-button>
```

### 宽度100%
``` html
<!-- 默认样式 -->
<a-button :is-block="true">开始</a-button>
```

### 幽灵样式
``` html
<!-- 默认样式 -->
<a-button :is-ghost="true" :is-block="true">开始</a-button>
```

### 加载动画
``` html
<!-- 默认样式 -->
<a-button :is-loading="true" :is-block="true">开始</a-button>
```

### 小按钮
``` html
<!-- 默认样式 -->
<a-button :is-loading="true" size="sm">开始</a-button>
```
### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| type | 情景色 | `String` | primary |primary success danger等|否|
| nativeType | 设置所在原生`<button>`元素的type属性 | `String` | button |button  submit  reset|否|
| isBlock | 是否设置width=100% | `Boolean` | false |true false|否|
| isDisabled | 是否不可点击 | `Boolean` | false |true false|否|
| hasRipple | 是否点击有水波纹动画 | `Boolean` | true |true false|否|
| isGhost | 是否采用镂空样式按钮 | `Boolean` | false |true false|否|
| isCircle | 是否圆角为100% | `Boolean` | false |true false|否|
| isRound | 是否微微有圆角 | `Boolean` | true |true false|否|
| isLoading | 是否显示加载动画 | `Boolean` | false |true false|否|
| size | 指定尺寸 | `Boolean` | - |sm|否|