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
| isShow | 是否显示 | `Boolean` | false |-|否|
| type | 情景色主题 | `String` | - |primary success info 等|否|
| placement | 对应popper的参数placement | `Object` | auto |-|是|
| isCloseAfterClick | 是否点击组件外关闭组件 | `Boolean` | true |-|是|
|content| 内容 | `String` | - | - | 是 |
|target| 目标元素选择器 | `String` | - | -|是| 

##### events
| 名称 | 说明 | 参数 |参数类型|
|-----------|-----------|-----------|-----------|
| update:isShow | 显示/隐藏触发 | 显示隐藏 |`Boolean`|
| update | popper发生onUpdate触发 | onUpdate的参数 |`Object`|

