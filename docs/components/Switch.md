## Switch
表单组件, 用来表示是否2中状态, 支持v-model

### 基本使用
``` javascript
{
    data(){
        return {
            isSelect1: true,
            isSelect2: false,
            isSelect3: true,
            isSelect4: false,
        }
    },
}
```

``` html
    <a-cell>
        <a-switch v-model="isSelect1">打开状态</a-switch>
    </a-cell>
    <a-cell>
        <a-switch v-model="isSelect2">关闭状态</a-switch>
    </a-cell>
    <a-cell>
        <a-switch v-model="isSelect3" :disabled="true">禁用状态的打开</a-switch>
    </a-cell>
    <a-cell>
        <a-switch v-model="isSelect4" :disabled="true">禁用情况的关闭</a-switch>
    </a-cell>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 是否打开 | `Boolean` | - |-|否|
| disabled | 是否禁用 | `Boolean` | false |-|否|

##### events

| 名称 | 说明 | 参数 | 参数类型|
|-----------|-----------|-----------|-----------|
| input | 返回当前是否打开 | 当前是否打开|`Boolean`|


##### slots
| 名称 | 说明 |
|-----------|-----------|
| default | 标题 |