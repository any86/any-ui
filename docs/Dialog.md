## Dialog
弹出层, 通过半透明遮罩, 用于突出提醒.

### 基本使用
```javascript
{
    data(){
        return {isShow: false};
    }
}
```

``` html
<a-dialog :is-show.sync="isShow">
    <a-cell>正常</v-cell>
    <a-cell>困难</v-cell>
    <a-cell>地狱</v-cell>
    <a-button type="primary" :is-block="true" class="gutter-top">开始游戏</a-button>
    <a-button :is-ghost="true" :is-block="true" @click="isShow=false" class="gutter-top">离开</a-button>
</v-dialog>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| isShow | 控制显示, 通过.sync支持双向绑定| `Boolean`  | false |-|是|
| align | 垂直对齐方式 | `String` | top  |top bottom|否|

##### events

| 名称 | 说明 | 回调参数 |参数类型|
|-----------|-----------|-----------|-----------|
| update:isShow | 显示/隐藏时触发  | 显示/隐藏 |`Boolean`|
