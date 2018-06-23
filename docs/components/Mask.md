## Mask
遮罩层

### 基本使用
``` html
<a-mask :is-show.sync="isShow">
    <p class="text-lightest">轻轻的我走了，正如我轻轻的来； 我轻轻的招手，作别西天的云彩。</p>
</a-mask>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| isShow | 显示隐藏 | `Boolean` | false |-|是|
| isStopPropagation | 是否阻止touch事件冒泡 | `Boolean` | true |-|是|
| isPreventDefault | 是否阻止默认事件 | `Boolean` | true |-|是|
| hasClose | 是否有关闭按钮 | `Boolean` | false |-|是|
| closeable |点击是否关闭| `Boolean`| false | - |否|
##### events
| 名称 | 说明 | 参数 |参数类型|
|-----------|-----------|-----------|-----------|
| update:isShow | 显示/隐藏触发 | 是否显示 |`Boolean`|
| after-enter | 动画发生触发 | - |-|
| after-leave | 动画结束触发 | - |-|

