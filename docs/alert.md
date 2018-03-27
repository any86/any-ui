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

第二个参数为对象, 可以进一步定制alert.
``` javascript
{
    methods: {
        clickHandle(){
            this.$alert('hello world', {
                onOk(){
                    // 点击确定按钮后触发 
                }
            });
        }
    }
}
```

### API

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|-----------|-----------|-----------|-------------|-------------|
| onOk | 点击确定按钮后触发 | `Function` | `null` |-|


 
