## Loading

### 基本使用

在任意组件内部可通过`this.$loading`方法调用, 全局只会生成一个loading, 所以可以通过`$loading.close()`关闭
``` javascript
{
    methods: {
        showLoading(){
            this.$loading('是否加入购物车?');
        },

        closeLoading(){
            this.$loading.close();
        }
    }
}
```

### 高级用法

通过第二个参数, 可以进一步定制loading.
``` javascript
{
    methods: {
        clickHandle(){
            this.$loading({
                background: 'rgba(0,0,0,0.5)',
                zIndex: '999',
            });
        }
    }
}
```




### API

| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| options | 选项 | `Object` | {} |-|否|

##### 展开options
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| background | 背景色 | `String` | transparent | - |否|
| zIndex | 层级 | `Number` | 1986 |-|否|

##### 方法
| 名称 | 说明 |
|-----------|-----------|
| close | 关闭loading |
