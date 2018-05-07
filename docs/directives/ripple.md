## ripple
水波纹特效

### 基本使用
``` html
<div v-touch:pinch="pinchHandle">手指捏合/张开触发</div>
```

``` javascript
methods: {
    pinchHandle: function(data, e){
        console.log(data, e);
    }
}
```

### 返回参数(data)
| 键值 | 说明 | 所属事件
|-----------|-----------|-----------|
| type | 事件类型, 如tap / pinch | `所有事件` |
| scale | 缩放倍数 | `pinch`|
| angle | 旋转角度 |`rotate`|
| deltaX | X轴滑动距离 | `swipe` |
| deltaY | Y轴滑动距离 | `swipe` |
| direction | 滑动方向: up/down/left/right | `swipe` |
| velocity | 滑动速度 | `swipe` |
| velocityX | X轴滑动速度 | `swipe` |
| velocityY | Y轴滑动速度 | `swipe` |
| holdTime | 手指触碰到离开经历的事件 | `swipe` |


                   