## Badge
徽章，支持情景色。

### 基本使用
``` html
<!-- 放在目标元素后面 -->
购物车<a-badge :value="10"/>

<!-- 包裹目标元素 -->
<a-badge :value="13">新好友</a-badge>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 显示内容 | `Any` | - |-|否|
| type | 情景色 | `String` | danger |primary success info warning danger dark...|否|