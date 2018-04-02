## Counter
计算器, 常见于购物车中增减商品数量, 支持v-model

### 基本使用
```javascript
{
    data(){
        return {value: 3};
    }
}
```

``` html
<!-- 默认: 最小值0, 最大值10 -->
<a-count v-model="value"/>

```
### 高级使用
``` html
<!-- 最小值为3, 最大值为5 -->
<a-count :min="3" :max="5" v-model="value"/>

<!-- 每次变化为2 -->
<a-count :step="2" v-model="value"/>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 当前显示数字 | `Number` `String` | 1 |-|是|
| min | 最小值 | `Number` | 1 |-|否|
| max | 最大值 | `Number` | 10 |-|否|
| step | 每步的变化 | `Number` | 2 |-|否|

##### events

| 名称 | 说明 | 回调参数 |参数类型|
|-----------|-----------|-----------|-----------|
| input | 数值变化触发  | 当前值 |`Number`|
| reachMin | 数值到达min值触发  | 当前值 |`Number`|
| reachMax | 数值到达max值触发  | 当前值 |`Number`|
