## Tabs
选项卡(页标签), 需要配合TabsItem使用

### 基本使用
``` javascript
{
    data(){
        return {
            index: 0,
        }
    },
}
```

``` html
    <a-tabs v-model="index">
        <a-tabs-item>详情</a-tabs-item>
        <a-tabs-item>
            <a-badge value="5">评论</a-badge>
        </a-tabs-item>
        <a-tabs-item>规格</a-tabs-item>
        <a-tabs-item>认证</a-tabs-item>
    </a-tabs>
```

### 菜单总宽度超过tabs整体宽度, 多余部分自动隐藏
``` javascript
{
    data(){
        return {
            index: 0,
            list: ['科技', '政治', '娱乐', '汽车', '电影', '音乐', '游戏', '天气', '直播', '微博', '微信', '生活常识', '怀孕', '养生', '计算机', '宠物', '时尚', '演员', '话剧', '非常6+1']
        }
    },
}
```

``` html
    <a-tabs v-model="index">
        <a-tabs-item v-for="text in list" :key="text">{{text}}</a-tabs-item>
    </a-tabs>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 当前选项卡索引 | `Number` | - |-|否|

##### events

| 名称 | 说明 | 参数 | 参数类型|
|-----------|-----------|-----------|-----------|
| input | 返回当前选中项索引 | 当前选中项索引|`Number`|


##### slots
| 名称 | 说明 |
|-----------|-----------|
| default | 插入TabItem组件 |