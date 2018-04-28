## SwipeOut
菜单抽屉, 需配合SwipeOutButton使用,常用来表示当前行信息的删除和编辑

### 基本使用
``` javascript
{
    data(){
        return {
            isShowRight: false,
        }
    },
}
```

``` html
    <a-cell>
        <a-switch v-model="isShowRight">切换</a-switch>
    </a-cell>

    <a-swipe-out :is-show-right.sync="isShowRight">
        <template slot="left">
            <a-swipe-out-button type="info">更多</a-swipe-out-button>
            <a-swipe-out-button type="danger">禁用</a-swipe-out-button>
        </template>

        <h4 class="fill">胶泥</h4>
        <template slot="right">
            <a-swipe-out-button type="success">编辑文章</a-swipe-out-button>
            <a-swipe-out-button >删除</a-swipe-out-button>
        </template>
    </a-swipe-out>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| isShowLeft | 是否展开左侧菜单, 支持.sync特性 | `Boolean` | false |-|否|
| isShowRight | 是否展开右侧菜单, 支持.sync特性 | `Boolean` | false |-|否|
| isStopPropagation | 拖拽时, 是否阻止touch事件冒泡 | `Boolean` | false |-|否|
| isPreventDefault | 拖拽时, 是否阻止默认事件 | `Boolean` | false |-|否|

##### events

| 名称 | 说明 | 参数 | 参数类型|可能值|
|-----------|-----------|-----------|-----------|-----------|
| open | 返回当前展开方向 | 当前展开方向 |`String`|left / right|
|update:isShowRight| 返回右侧菜单是否展开 | 右侧菜单是否展开 |`Boolean`|-|
|update:isShowLeft| 返回左侧菜单是否展开 | 左侧菜单是否展开 |`Boolean`|-|

##### slots
| 名称 | 说明 |
|-----------|-----------|
| default | 内容主体 |
| left | 左侧抽屉 |
| right | 右侧抽屉 |