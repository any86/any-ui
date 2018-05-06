## Picker
遮罩层

### 基本使用
```javascript
data(){
    const zones = [{label: '东北', value: 1}, {label: '西北', value: 2}];
    const citys = [{label: '哈尔滨', value: 11}, {label: '陕西', value: 22}];
    return {
        dataSource: [zones, citys],
        value: [1,11]
    }
}
```

``` html
<a-picker :data-source="dataSource" v-model="value"/>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| dataSource | 数据源, 2维数组 | `Array` | - |-|是|
| value | 当前选择值, 对应dataSource中的每个选项的value的值 | `Any` | - |-|是|
| itemHeight | 每个选项的高度,单位px | `Number` | 36 |-|是|

##### events
| 名称 | 说明 | 参数 |参数类型|
|-----------|-----------|-----------|-----------|
| input | 值变化触发 | 当前列值 |`String`|
| change | 值变化触发 | 当前值, columnIndex: 当前列列索引, rowIndex: 当前行索引, value: 当前列的值, 当前值的显示标题|`Object`|