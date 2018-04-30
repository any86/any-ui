## Textarea
多行文本框, 支持自动换行.

### 基本使用
``` javascript
{
    data(){
        return {
            content: '',
        }
    },
}
```

``` html
    <a-textarea v-model="content"/>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 内容 | `String` | - |-|否|
| isShowPrompt | 是否显示总数提示 | `Boolean` | false |-|否|

##### events

| 名称 | 说明 | 参数 | 参数类型|
|-----------|-----------|-----------|-----------|
| input | 内容发生变化触发 | 当前输入内容|`String`|
| focus | 得到焦点触发 | Event对象 |`Object`|
| blur | 失去焦点触发 | Event对象|`Object`|
