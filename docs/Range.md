## Range
范围滑块, 支持v-model

### 基本使用
``` javascript
{
    data(){
        return {
            value1: 50,
            value2: 10,
            value3: 0}
    },
}
```

``` html
    <a-cell>
        <a-range v-model="value1"/>
        <a-tag type="primary" slot="extra">当前: {{value1}}</a-tag>
    </a-cell>

    <a-cell>
        <a-range v-model="value2" :min="10" :max="20"/>
        <a-tag type="primary" slot="extra">当前: {{value2}}</a-tag>
    </a-cell>

    <a-cell>
        <a-range v-model="value3" :min="0" :max="50" :step="2"/>
        <a-tag type="primary" slot="extra">当前: {{value3}}</v-tag>
    </a-cell>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 当前值 | `String` / `Number` | - |-|是|
| min | 最小值 | `String` / `Number` | 0 |-|否|
| max | 最小值 | `String` / `Number` | 100 |-|否|

##### events

| 名称 | 说明 | 参数 | 参数类型|
|-----------|-----------|-----------|-----------|
| input | 返回当前值 |  当前选中值 |`String` / `Number`|