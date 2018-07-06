## Input
输入框, 支持v-model

### 基本使用
```javascript
{
    data() {
        return {
            text1: 'hello vue !',
            text2: '0000 0000 0000 0000',
            text3: '133123456789',
            text4: '01234567',
            text5: 'abc',
            text6: 'abc',
            isShowWarning: true,
            vaildates: [
                { required: true, message: '学校不能为空!' }, 
                { message: '不能相同哦!', fn: this.isSame }, 
                { regular: /a/, message: '必须包含a!' }
            ]
        };
    },

    methods: {
        isSame() {
            return 1 == 1;
        },
    }
}
```

``` html
<a-cell>
    <template slot="title">学校</template>
    <a-input :vaildate="vaildates" placeholder="请输入学校" v-model="text1"/>
</a-cell>

<a-cell>
    <template slot="title">银行卡流水</template>
    <v-input maxlength="14" v-model="text2" type="bankCode" />
</a-cell>

<a-cell>
    <template slot="title">手机</template>
    <a-input maxlength="13" v-model="text3" type="phone" />
</a-cell>

<a-cell>
    <template slot="title">流水号</template>
    <v-input maxlength="13" v-model="text4" type="number" />
</a-cell>

<a-cell>
    <template slot="title">字母</template>
    <v-input maxlength="13" v-model="text5" type="letter" />
</a-cell>

<a-cell>
    <template slot="title">过滤非字母</template>
    <a-input :filter="/[^a-zA-Z]/g" v-model="text6"/>
</a-cell>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 输入值 | `String` | - |-|是|
| type | 用来限制输入内容的格式 | `String` | - |bankCode letter phone number|否|
| hasRemove | 是否有清空按钮(x图标) | `Boolean` | true |-|否|
| vaildate | blur触发时, 验证输入的规则 | `Array` | [] |-|否|
| hasWarningDialog | 验证不匹配的时候, 是否出现提示| `Boolean` | true |-|否|
| filter |过滤指定条件的输入| `RegExp` | - |-|否|
| vaildate |校验规则| Array | - |-|否|


##### events
| 名称 | 说明 | 参数 |参数类型|
|-----------|-----------|-----------|-----------|
| input | 输入文字触发 | 输入内容 |`String`|
| warning | 发生验证不匹配触发 | 提示语 | `String` |
| focus | 聚焦 | event | `Event` |
| blur | 失去焦点 | event | `Event` |
| keyup | 按下键盘 | event | `Event` |
| keydown | 键盘弹起 | event | `Event` |


### 验证规则(vaildate)
| 名称 | 说明  |参数类型|
|-----------|-----------|-----------|-----------|
| required | 是否必填  |`Boolean`|
| message | 不满足条件时的提示文案  | `String` |
| fn | 自定义验证函数, 返回ture通过, 反之提示message信息  | `Function` |
| regular | 正则, 返回ture通过, 反之提示message信息  | `Regexp` |