## ActionSheet

### 基本使用
放在滚动的容器中
``` javascript
this.$action({
    title: '请选择一个水果',
    dataSource: [
        {
            type: 'danger',
            content: '苹果',
        },
        {
            content: '鸭梨',
        },
    ],
});
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| dataSource | 按钮的数据结构 | `Object` |-|-|是|
| title | 标题 | `String` | - |-|否|


##### dataSource

| 名称 | 说明 |
|-----------|-----------|
| type | 情景色success / danger / info等 | 
| content | 按钮显示内容, 支持html | 