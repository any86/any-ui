## $picker

### 基本使用

``` javascript
const years = [{label: 2019, value:2019}, {label: 2018, value:2018}];
const months = [{label: '1月', value:1}, {label: '2月', value:2}];
const value = [2018, 1];
this.$picker([years, months], {
    value, // 必填
    onOk:(value)=>{
        this.$alert(value);
    }
});
```

### API
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| data-source | 数据源 | `Object` | 无 |-|否|
| options | 更多配置 | `Object` | -|-|否|

#### 更多配置
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| onOk | 点击'确定'触发 | `Function` | - |-|否|
| onCancel | 点击'取消'触发  | `Function` |- |-|否|