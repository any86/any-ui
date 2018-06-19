## Radio
单选框, 支持v-model. 可单独使用, 也可配合cell组件使用

### 基本使用
``` javascript
{
    data(){
        return {select1: 1}
    },
}
```

``` html
    <a-group>
        <a-cell>
            <a-radio  v-model="select1" :value="1">选项1</a-radio>
        </a-cell>

        <a-cell>
            <a-radio v-model="select1" :value="2">选项2</a-radio>
        </a-cell>
    </a-group>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 选项值, 选中后后会同步到v-model中 | `Any` | - ||是|
| inline | 是否行内元素 | `Boolean` | false ||否|

##### slot

| 名称 | 说明 |
|-----------|-----------|
| default | 标题 |


##### events

| 名称 | 说明 | 参数 | 参数类型|
|-----------|-----------|-----------|-----------|
| change | 返回当前选中值 |  当前选中值 |`Any`|