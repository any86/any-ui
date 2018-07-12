## Popup
弹出层

### 基本使用
```javascript
//从上方滑入
{
    data() {
        return {
            from: 'top',
            isShow: false
        };
    }
}
```

``` html
    <a-popup :is-show.sync="isShow" :from="from">
        <a-cell>正常</a-cell>
        <a-cell>困难</a-cell>
        <a-cell>地狱</a-cell>
        <div class="fill">
            <a-button type="primary" :is-block="true">开始游戏</a-button>
            <a-button :is-ghost="true" :is-block="true" @click="isShow=false" class="gutter-top">离开</a-button>
        </div>
    </a-popup>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| is-show | 是否显示 | `Boolean` | false |-|否|
| from | 动画进入方向 | `String` | bottom |top left right bottom|否|
| width | 宽度, 只有from为left/right时生效| `String` | 80% | - | 否 |
| has-close | 是否有关闭按钮| `Boolean` | false | - | 否 |

##### events
| 名称 | 说明 | 参数 |参数类型|
|-----------|-----------|-----------|-----------|
| update:isShow | 显示/隐藏触发 | 显示隐藏 |`Boolean`|
| after-dialog-leave | 内容区显示隐藏动画结束触发 | - |-|
| after-mask-leave | 遮罩层显示隐藏动画结束触发 | - |-|

