## Group
布局组件,用来隔离不同的功能块

### 基本使用
``` html
<a-group>
    <template slot="header">
        我带
        <span class="text-danger">margin-top, </span>值为scss文件中配置的
        <span class="text-danger">$gutter</span>
    </template>
    <a-cell>
        <template slot="extra">床前明月光</template>
    </a-cell>
    <a-cell>
        <template slot="extra">玻璃爱上霜</template>
    </a-cell>
</v-group>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| title | 标题| `String` | - |-|否|

##### slots
| 名称 | 说明 |
|-----------|-----------|
| default | 内容主体 |
| title | 标题 |
