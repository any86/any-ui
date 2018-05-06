## Checkbox
复选框, 支持v-model. 可单独使用, 也可配合cell组件使用

### 基本使用
``` html
<!-- 根据是否选中, v-model返回true-value或false-value -->
<a-cell>
    <a-checkbox v-model="select1" :true-value="1" :false-value="2">选项1</a-checkbox>
</a-cell>

<a-cell>
    <a-checkbox v-model="select2" :true-value="1" :false-value="2">选项2</a-checkbox>
</a-cell>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| isDisabled | 是否禁用 | `Boolean` | false |-|否|
| true-value | 选中时候, v-model返回的值 | `Any` | true |-|否|
| false-value | 选中时候, v-model返回的值 | `Any` | false |-|否|
| isReverse | 是否让调换文字和图标的位置 | `Boolean` | - ||否|
| value | 是否选中, 设置了v-model, 就不需要设置value了 | `Boolean` | - ||否|

##### slot

| 名称 | 说明 |
|-----------|-----------|
| default | 标题 |


##### events

| 名称 | 说明 | 参数 | 参数类型|
|-----------|-----------|-----------|-----------|
| input | 返回是否选中 |  是否选中 |`Boolean`|