---
sidebarDepth: 0
---

## Input
输入框, 支持v-model

### 基本使用
``` html
<a-cell>
    <template slot="title">学校</template>
    <a-input :vaildate="vaildates" v-model="text1"/>
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
| filterExp |过滤指定条件的输入| `String` / `RegExp` | - |-|否|



##### events
| 名称 | 说明 | 参数 |参数类型|
|-----------|-----------|-----------|-----------|
| input | 输入文字触发 | 输入内容 |`String`|
| warning | 发生验证不匹配触发 | 提示语 | `String` |
| focus | 原生focus | event | Event |
| blur | 原生focus | event | Event |
| keyup | 原生focus | event | Event |
| keydown | 原生focus | event | Event |


##### vaildate(验证规则)
未完...