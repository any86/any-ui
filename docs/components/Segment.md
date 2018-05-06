## Segment
切换按钮组, 常用于切换2个不同的内容区域, 需要配合SegmentItem组件一起使用

### 基本使用
``` javascript
{
    data(){
        return {
            activeIndex: 0
        }
    },
}
```

``` html
    <a-segment v-model="activeIndex" class="gutter-top">
        <a-segment-item>最热</a-segment-item>
        <a-segment-item>用户评论</a-segment-item>
    </a-segment>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 当前选项卡索引 | `Number` | - |-|是|

##### events

| 名称 | 说明 | 参数 | 参数类型|
|-----------|-----------|-----------|-----------|
| input | 返回当前选中索引 |  当前索引 |`Number`|