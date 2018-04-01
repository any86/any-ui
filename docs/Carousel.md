## Carousel
配合CarouselItem组件实现轮播

### 基本使用
``` html
<!-- 可以通过height属性指定高度, 也可以通过style设置高度 -->
<!-- 通过v-model,对轮播双向绑定 -->
<a-carousel v-model="index" height="500" >
    <a-carousel-item><h1 style="height:500px">1</h1></a-carousel-item>
    <a-carousel-item><h1 style="height:500px">2</h1></a-carousel-item>
    <a-carousel-item><h1 style="height:500px">3</h1></a-carousel-item>
</carousel>
```

### 图片懒加载
``` html
<!-- 自动识别carouselItem内部的img上的lazy-src属性 -->
<a-carousel v-model="index" height="300" >
    <a-carousel-item v-for="url in images" :key="url"><img :lazy-src="url" width="100%" height="300"/></a-carousel-item>
</a-carousel>
```

### 一屏多图
``` html
<!-- 通过slides-per-view设置每屏幕显示轮播数 -->
<a-carousel v-model="index"  height="200"  :slides-per-view="2.2">
    <a-carousel-item v-for="image in images" :key="image">
        <img :lazy-src="image" width="100%" height="200" />
    </a-carousel-item>
</a-carousel>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 当前索引 | `Number` | 0 |-|否|
| slidesPerView | 每屏幕显示的item数 | `Number` | 1 |-|否|
| hasPageBtn | 是否显示页码指示器 | `Boolean` | true |-|否|
| isAutoPlay | 是否自动播放 | `Boolean` | false |-|否|
| isLoop | 是否循环播放 | `Boolean` | false |-|否|
| threshold | 触发轮播的拖拽距离 | `Number` | 15px |-|否|
| delay | 每页停留时间 | `Number` | 3000 |-|否|
| disableOnInteraction | 发生交互是否停止自动播放 | `Boolean` | false |-|否|
| speed | 切换动画速度 | `Number` | 300 |-|否|
| loadPrevNext | 是否预读前后item中的图片 | `Boolean` | true |-|否|
| loadPrevNextAmount | loadPrevNext预读数量 | `Number` | 1 |-|否|
| width | 宽度 | `Number` | - |-|否|
| height | 高度 | `Number` | - |-|否|

##### events

| 名称 | 说明 | 参数 |参数类型|
|-----------|-----------|-----------|-----------|
| init | 加载完成后运行 | pageBtnCount: 总页数 |`Object`|
| touchstart | touchstart | - | - |
| touchmove | touchmove | - | - |
| touchend | touchstart | - | - |
| input | 切换触发 | 索引 | `Number` |
| update:realIndex | 切换触发 | 真实索引 | `Number` |
| change | 切换触发 | 真实索引& 逻辑索引 | `Object` |






