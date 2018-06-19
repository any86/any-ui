## $toast

### 基本使用

``` javascript
// 默认3秒后自动关闭,
this.$toast('3秒后自动关闭');

// 支持4种情景: success / warning / danger / loading
this.$toast('我支持情景色', {type:'success'});

// 关闭, 注意一个页面同时只有一个toast
this.$toast.close();
```

### API
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| content | 显示文字 | `String` | 无 |-|否|
| options | 更多配置 | `Object` | -|-|否|

#### 更多配置
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| type | 情景 | `String` | 无 |primary / success / info ...|否|
| delay | 延迟关闭, 0为不自动关闭 | `String` | 0 |-|否|
| closeable | 点击非toast部分是否可以关闭toast | `String` | 0 |-|否|
| position | 出现位置 | `String` | center |top / bottom / center|否|