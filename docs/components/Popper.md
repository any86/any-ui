## Popper
遮罩层

### 基本使用
```javascript
{
    data() {
        return {
            scrollTop: 0,
            isShow1: false,
            isShow2: false,
            isShow3: false
            
        };
    },

    mounted() {
        this.isShow1 = true;
    },

    methods: {
        showMore(){
            this.scrollTop=9999;
            this.isShow1 = false;
        },
    }
}
```

``` html
        <a-cell :has-ripple="true" v-for="n in 15" :key="n+10" @click="scrollTop=9999">
            滑动到底部{{String.fromCharCode(64 + parseInt(n))}}</a-cell>

        <!-- 模拟confirm -->
        <a-button  type="success"  @click="isShow1=!isShow1" class="gutter-top trigBtn">
            模拟confirm</a-button>

        <a-popper :is-show.sync="isShow1" target=".trigBtn" class="fill">
            <h4 class="fill-bottom-sm fill-top-sm text-darkest">查看更多?</h4>
            <a-button type="dark"  size="sm" @click="showMore" class="gutter-top" >取消</a-button>
            <a-button type="danger" size="sm"  @click="showMore" class="gutter-top">确定</a-button>
        </a-popper>

        <!-- 模拟下拉菜单 -->
        <a-button id="drop-down"  type="info"  @click="isShow2=!isShow2" class="gutter-top">
            <a-icon name="menu" size="16"/>
            模拟下拉菜单</a-button>

        <a-popper :is-show.sync="isShow2" target="#drop-down">
            <a-cell :has-ripple="true" v-for="n in 5" :key="n" @click="isShow2=false">系统菜单{{String.fromCharCode(64 + parseInt(n))}}</a-cell>
        </a-popper>

        <!-- 通过theme属性支持情景色 -->
        <a-button id="type-theme"  type="danger" @click="isShow3=true" class="gutter-top">
            通过type属性支持情景色</a-button>

        <a-popper type="danger" :is-show.sync="isShow3" target="#type-theme" class="fill">
            情景色
        </a-popper>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| isShow | 是否显示 | `Boolean` | false |-|否|
| type | 情景色主题 | `String` | - |primary success info 等|否|
| placement | 对应popper的参数placement | `Object` | auto |-|是|
| isCloseAfterClick | 是否点击组件外关闭组件 | `Boolean` | true |-|是|
| content | 内容 | `String` | - | - | 是 |
| target | 目标元素选择器 | `String` | - | -|是| 

##### events
| 名称 | 说明 | 参数 |参数类型|
|-----------|-----------|-----------|-----------|
| update:isShow | 显示/隐藏触发 | 显示隐藏 |`Boolean`|
| update | popper发生onUpdate触发 | onUpdate的参数 |`Object`|

