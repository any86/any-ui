## $loading

### 基本使用
``` javascript
// 默认3秒后自动关闭,
this.$loading('3秒后自动关闭');

// 支持4种情景: success / warning / danger / loading
this.$loading('我支持情景色', {type:'success'});

// 关闭, 注意一个页面同时只有一个loading
this.$loading.close();
```

### API
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| content | 显示文字 | `String` | 无 |-|否|

### 说明
其实`$loading`是`$toast`的一个特例