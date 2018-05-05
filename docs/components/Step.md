## Step
步骤提示, 支持v-model

### 基本使用
``` javascript
{
    data(){
        return {
            activeIndex: 0,
        }
    },
}
```

``` html
    <a-steps v-model="activeIndex">
        <a-steps-item>支持简单模式，即不指定icon，label将垂直居中显示。</a-steps-item>
        <a-steps-item>使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等。</a-steps-item>
        <a-steps-item>当页面加载时，元素将获得焦点 (注意：autofocus 在移动版 Safari 上不工作)。事实上，你访问后还没点击任何内容，input 就获得了焦点。现在让我们完善这个指令：</a-steps-item>
    </a-steps>
    <a-button :is-ghost="true" @click="prev">上一步</a-button>
    <a-button type="primary" @click="next">下一步</a-button>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 当前步骤索引 | `Number` | - |-|是|
##### events

| 名称 | 说明 | 参数 | 参数类型|
|-----------|-----------|-----------|-----------|
| input | 返回当前步骤索引 |  当前步骤索引 |`Number`|