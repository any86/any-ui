## Alert

### 基本使用

在任意组件内部可通过this.$alert方法调用
``` javascript
{
    methods: {
        clickHandle(){
            this.$alert('hello world');
        }
    }
}
```

### 高级用法

通过第二个参数, 可以进一步定制alert.
``` javascript
{
    methods: {
        clickHandle(){
            this.$alert('hello world', {
                title: '系统提示',
                align: 'top',
                onOk(){
                    // 点击确定按钮后触发 
                }
            });
        }
    }
}
```

### API

| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| content | 标题 | `String` | 无 |-|是|
| options | 选项 | `Object` | {} |-|否|

##### 展开options(第二个参数) 
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| title | 标题 | `String` | 无 | - |否|
| align | 对齐方式 | `String` | bottom |top bottom center|否|
| okText | 确定按钮文字 | `String` | 无 | - | 否 |
| onOk | 点击确定按钮后触发 | `Function` | 无 | - | 否 |