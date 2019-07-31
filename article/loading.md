# 面试官: "用css实现android系统的loading动画"

源码: https://github.com/any86/any-ui/blob/master/src/components/_loading.scss

## ios/android
web常用的loading图标有2种, 一种是ios的"菊花", 一种是android的"环". 今天我们用svg实现android的"环"动画, 下节课实现ios的"菊花".
![](https://user-gold-cdn.xitu.io/2019/7/24/16c22ad69ef58d9a?w=38&h=41&f=gif&s=36529)
**注意**: gif帧数少的原因, 实际动画效果是很**平滑**的.

## xml(svg)

```xml
<svg width="36" height="36" viewBox="0 0 50 50" class="a-loading-android">
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor"  stroke-width="5"></circle>
</svg>
```
首先我们定义svg的画布尺寸为**50x50**, 在浏览器中缩放为**36x36**显示(这个36你可以根据实际需要调整), 定义环的圆心坐标为**25,25**, **半径为20**(算下**周长大概为125**, 后面会用到), 颜色为**currentColor**获取父元素的color属性的值, 环的宽度为5像素, 看下在没写css前的效果:
![](https://ws1.sinaimg.cn/large/005IQkzXly1g59tuby5mdj30130170sh.jpg)


## scss

```scss
.a-loading {
    &-android {
        animation: rotate 2s linear infinite;
        transform-origin: center center;
        >circle {
            display: inline-block;
            animation: dash 1500ms ease-in-out infinite;
            stroke-linecap: round; // 端点是圆形
            color: currentColor;
        }

        @keyframes rotate {
            100% {
                transform: rotate(360deg);
            }
        }
        
        @keyframes dash {
            0% {
                stroke-dasharray: 1, 200;
            }

            50% {
                stroke-dasharray: 100, 200;
                stroke-dashoffset: -45;
            }

            100% {
                stroke-dasharray: 100, 200;
                stroke-dashoffset: -124;
            }
        }
    }
}
```

### stroke-dasharray
先解释`stroke-dasharray`, 他是用来定义虚线的,  比如`stroke-dasharray="50, 20"`表示实线部分为50, 间隙20的虚线: 
![](https://ws1.sinaimg.cn/large/005IQkzXly1g5arexm7sgj30e300t0qq.jpg)

![](https://ws1.sinaimg.cn/large/005IQkzXly1g5aw5fwq4tj3014013a9t.jpg)
试想一下, 如果环也用虚线表示, 并且让**单位实线**部分的长度在环的周长范围内变化,这不就实现了(半环/满环等形态), 下面分别是`stroke-dasharray`的值为`25, 200`/ `50, 200` / `100, 200`:
![](https://ws1.sinaimg.cn/large/005IQkzXly1g5arb0e7muj303x01bq2p.jpg)
**注意**: 这里的`200`是随意定义的, 表示虚线的间隙, 只要值大于环的周长即可.

### stroke-dashoffset
偏移, 值为正数的时候, 虚线逆时针回退, 负数顺时针前进(左图的stroke-dashoffset:0, 环的起点在3点方向, 右图设置为-10以后, 环的起点被顺时针偏移了一段距离):
![](https://ws1.sinaimg.cn/large/005IQkzXly1g5as5rhj03j305i02lmx0.jpg)
因为动画中, 环在增加长度的同时**尾部在收缩长度**, 所以需要配合`stroke-dashoffset`实现.

### 动画的3个关键时刻
![](https://ws1.sinaimg.cn/large/005IQkzXly1g5awigfu1pj304m02qt8k.jpg)

##### **0%**的时刻
让圆环只呈现一个点, 为了让循环一周后动画不突兀(你可以改成0对比下效果). 

##### **50%**的时刻
为了让圆环呈现80%的环, 所以设置实线部分长度为100(125*0.8, 125是周长): `stroke-dasharray: 100, 200;`, 同时尾部在收缩, 所以设置` stroke-dashoffset: -45;`.

##### **100%**的时刻
回到一个点的状态, 和0%状态一致, 这样动画循环起来不突兀, 但是从50%到100%的动画只是"尾部收缩", 所以我们用`stroke-dashoffset:-124`实现,`125-124=1` 正好是一个像素, 好了动画到此就实现完毕了.

### 整体旋转
为了和安卓系统的动画一致, 让整体也进行旋转. 这里代码比较简单不赘述.

## animation属性的扩展
如果大家仔细看过css的`animation`的文档, 会发现`animation`可以同时支持多个过度动画, 比如`animation: color 6s ease-in-out infinite, dash 1.5s ease-in-out infinite;`, 用","分割多个动画.

所以我们其实还可以对上面的动画进行扩展, 比如**旋转的同时还有颜色变化**:

![](https://user-gold-cdn.xitu.io/2019/7/24/16c22abd7e87e65e?w=38&h=51&f=gif&s=121449)



```scss
    &-android {
        animation: rotate 2s linear infinite;
        transform-origin: center center;
        >circle {
            display: inline-block;
            // 增加颜色变化的代码
            animation: color 6s ease-in-out infinite, dash 1.5s ease-in-out infinite; 
            stroke-linecap: round;
            color: currentColor;
        }

        @keyframes rotate {
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes dash {
            0% {
                stroke-dasharray: 1, 200;
            }

            50% {
                stroke-dasharray: 100, 200;
                stroke-dashoffset: -45;
            }

            100% {
                stroke-dasharray: 100, 200;
                stroke-dashoffset: -124;
            }
        }

        @keyframes color {

            0%,
            100% {
                stroke: #6b5c5b;
            }

            40% {
                stroke: #0057e7;
            }

            66% {
                stroke: #008744;
            }

            80%,
            90% {
                stroke: #ffa700;
            }
        }
    }
```

本文代码参考**iview**, 一个vue框架.