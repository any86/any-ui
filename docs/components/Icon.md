## Icon
基于svg的小图标, 通过color改变颜色, 自动集成父元素的color属性.

:::tip
仅为组件库组件设计, 所以很少, 如您需要更多图标, 可以单独引入第三方字库, 如[ionic](https://ionicframework.com/docs/ionicons/) 或 [iconfont](http://www.iconfont.cn/)等
:::

### 基本使用
``` html
<a-icon name="plus" class="border"/>
<a-icon name="arrow-left" class="border"/>
<a-icon name="arrow-right" class="border"/>
<a-icon name="arrow-up" class="border"/>
<a-icon name="arrow-down" class="border"/>
<a-icon name="minus" class="border"/>
<a-icon name="menu" class="border"/>
<a-icon name="close" class="border"/>
<a-icon name="tick" class="border"/>
<a-icon name="star" class="border"/>
<a-icon name="star-o" class="border"/>
<a-icon name="warning" class="border"/>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| name | 图标名称 | `String` | plus arrow minus... |-|是|
| size | 宽度和高度 | `Number` | 48 |-|否|


##### name 
| 值 | 说明 | 
|-----------|-----------|
| plus | 加号 | 
| arrow | 箭头 | 
| minus | 减号 | 
| menu | 三横菜单 | 
| close | 关闭 | 
| tick | 对号 | 
| star | 实心星星 | 
| star-o | 空心星星 | 
| warning | 感叹号 |

