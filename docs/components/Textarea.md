## Textarea
多行文本框, 支持自动换行(感谢autosize). 

### 基本使用
``` javascript
export default {
    data() {
        return {
            exp: new RegExp('[a-zA-Z]', 'g'),
            length1: 0,
            leftLength1: 0,
            content1: 'vue atom',
            content2: '过滤字母',
        };
    },
};
```

``` html
    <a-textarea 
        :maxlength="10"
        ref="test" 
        :autofocus="true" 
        @focus="focus" 
        @blur="blur" 
        v-model="content1">
        <span slot="append" class="fill-right-sm">
            {{leftLength1}} left
        </span>
    </a-textarea>

    <!-- 过滤输入 -->
    <a-textarea :filter-exp="exp" v-model="content2"/>
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