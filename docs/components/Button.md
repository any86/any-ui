## Button
按钮, 支持情景色主题
### 基本使用
``` html
<!-- 默认块级元素宽度100%, 带圆角 -->
<a-button>开始</a-button>
```
### 支持情景色
``` html
<a-button type="success">开始</a-button>
```

### inline
``` html
<a-button inline>行内小按钮</a-button>
```

### 幽灵样式
``` html
<a-button outline>开始</a-button>
```

### 禁用
``` html
<a-button disabled>开始</a-button>
```

### 加载动画
``` html
<a-button loading>发送</a-button>
```

### 圆形按钮
``` html
<a-button circle>发送</a-button>
```

### 图标
``` html
<!-- 支持Icon组件支持的图标 -->
<a-button circle icon="tick">发送</a-button>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| type | 情景色 | `String` | primary |primary success danger等|否|
| inline | 行内小按钮 | `Boolean` | false |true false|否|
| disabled | 禁用 | `Boolean` | false |true false|否|
| hasRipple | 是否点击有水波纹动画 | `Boolean` | true |true false|否|
| ghost | 是否采用镂空样式按钮 | `Boolean` | false |true false|否|
| circle | 是否圆角为100% | `Boolean` | false |true false|否|
| icon | 图标 | `String` | - |Icon组件支持的图标|否|
| loading | 是否显示加载动画 | `Boolean` | false |true false|否|
| nativeType | 原生<button>的type属性 | `Boolean` | false |true false|否|
| rounded | 是否有圆角 | `Boolean` | true |true false|否|
