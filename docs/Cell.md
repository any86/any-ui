## Cell
移动端常见的列表每一项的布局

### 基本使用
``` html
<!-- 通过arrow-direction控制箭头方向, 如果不传, 那么不显示箭头 -->
<a-cell>arrow-direction=up</a-cell>
<a-cell arrow-direction="up">arrow-direction=up</a-cell>
<a-cell arrow-direction="right">arrow-direction=right</a-cell>
<a-cell arrow-direction="down">arrow-direction=down</a-cell>
<a-cell arrow-direction="left">arrow-direction=left</a-cell>
```

### 通过title插槽, 在左侧补充一些文案(图标)等, 并左对齐
``` html
<v-cell>
    <template slot="title">生活不止眼前的苟且</template>
</v-cell>
<v-cell>
    <template slot="    <template slot="title">生活不止眼前的苟且</template>
">诗和远方</template>
</v-cell>
```

### 通过extra插槽, 在右侧补充一些文案(图标), 并右对齐
``` html
<v-cell>
    <template slot="extra">生活不止眼前的苟且</template>
</v-cell>
<v-cell>
    <template slot="extra">诗和远方</template>
</v-cell>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| title | 左侧标题 | `String` | - |-|否|
| extra | 右侧补充内容 | `String` | - |-|否|
| bodyStyle | 内容区样式 | `Object` | {} |-|否|
| textAlign | 内容文字对齐方式 | `String` | - |left right center start end|否|
| arrowDirection | 右侧箭头方向, 如不赋值, 那么不显示箭头 | `String` | - |up right down left|否|


##### slot
| 名称 | 说明 |
|-----------|-----------|
| default | 内容主体 |
| title | 左侧标题 |
| extra | 右侧补充内容 |