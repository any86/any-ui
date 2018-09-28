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
| filterExp |过滤指定条件的输入| `String` / `RegExp` | - |-|否|

##### events

| 名称 | 说明 | 参数 | 参数类型|
|-----------|-----------|-----------|-----------|
| input | 内容发生变化触发 | 当前输入内容|`String`|
| focus | 得到焦点触发 | Event对象 |`Object`|
| blur | 失去焦点触发 | Event对象|`Object`|
| change-length | 输入文字的字数发生变化触发| 当前文字长度| `number`|
| change-left-length | 输入文字的字数发生变化触发| 还可以输入多少文字| `number`|