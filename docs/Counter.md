## Collapse
折叠, 配合CollapseItem组件实现折叠选项卡功能

### 基本使用
``` html
    <!-- isAccordion控制是否同时能打开多个选项卡 -->
    <a-collapse :is-accordion="isAccordion">
        <a-collapse-item v-for="n in 3" :key="n" :title="`第${n}行`">
            已经打开第{{n}}行
        </a-collapse-item>
    </a-collapse>
```
### 高级使用
``` html
<a-collapse :is-accordion="isAccordion">
    <a-collapse-item :is-open="true">
        <template slot="header">
            props: is-accordion
        </template>
        设置is-accordion="true"后, 同时只能打开一个选项卡
    </a-collapse-item>
    <a-collapse-item title="props: title" :is-open="false">
        collapse-item标签上设置可设置title/is-open属性
    </a-collapse-item>
    <a-collapse-item title="slot: header" :is-open="false">
        对了, collapse-item还支持name="header"的slot
    </a-collapse-item>
</a-collapse>
```

### API
#### ********** Collapse Api **********

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| isAccordion | 是否同时只能打开1个选项卡 | `Boolean` | false |-|否|
##### slot

| 名称 | 说明 |
|-----------|-----------|
| default | 只能放CollapseItem组件 |

#### ********** CollapseItem Api **********
##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| isOpen | 是否打开, 支持.sync修饰符 | `Boolean` | false |-|否|
| hasLine | 标题下是否有线 | `Boolean` | false |-|否|
| hasAnimate | 是否有切换动画 | `Boolean` | true |-|否|


##### slot

| 名称 | 说明 |
|-----------|-----------|
| default | 任意组件/元素 |
| title | 标题 |


##### events

| 名称 | 说明 | 参数 |参数类型|
|-----------|-----------|-----------|-----------|
| update:isOpen | 展开/闭合触发, 返回状态  | 是否已打开 |`Boolean`|
| change | 展开/闭合触发, 返回当前选项卡索引  | 当前选项卡索引 |`Number`|
