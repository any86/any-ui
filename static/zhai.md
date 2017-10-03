## 什么是vue?
一个js框架, 可以让你写更少的代码, 同时代码更容易维护和迭代.

#### vue和jq的2个简单的增删改查小示例
1. **vue**输入框
https://jsfiddle.net/_russell997/kmb0q8og/8/

2. **jq**输入框
https://jsfiddle.net/_russell997/wjb5atk8/10/

## 大公司在用吗?
京东金融/新浪金融/饿了么等, 毕竟是这2/3年崛起的框架, 大公司原有的页面因为已经上线是轻易不敢改的, 但是近年新出的页面都会用vue/react数据驱动的框架来实现.

## 北上广的普通公司在用吗?
[拉钩网搜索'前端'](https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?labelWords=&fromSearch=true&suginput=)

## 我在哈尔滨工作, vue有什么好处?
17年开始, 哈尔滨越来越多的用人单位(薪资6k+)的招聘信息中明确要求会用vue或者react等框架, 从自身角度为了涨工资,我们应该学习vue, 或者说vue是进入前端高薪领域一道门, 毕竟我们会的技能越契合企业需求收入越高.

## jq还用不用了?
如果单位还需要兼容ie低版本的浏览器, jq用来做交互少的活动页面最适合, 比如fullpage类型的广告页面和企业官网. 如果只是兼容高版本浏览器的活动页可以直接用原生js, 这样我们页面的体积会更小(**vue**: 28.96kb min+gzip / **jquery-3.2.1.min** : 30.63kb min+gzip), 因为高版本浏览器支持querySelector()和css3动画.
在vue学习初期, 最容易问的2个问题就是如何获取dom尺寸信息和异步请求,获取元素的位置/尺寸等, 可以用js原生的getBoundingClientRect(), 异步请求(ajax)用axios.js(1k min+gzip)

#### 组件库
可能大家会担心, vue的组件有没有jq的插件那么丰富, 实际上vue的组件有很多, 完全可以覆盖所有开发需求, 比如现在最火的[饿了么桌面端组件库](http://element.eleme.io/)和[移动端组件库vux](https://vux.li/#/), 以及一些vue[官方收集的组件库](https://github.com/vuejs/awesome-vue)


#### 新浪金融
jr.sina.com 是我一前同事做的, 他是今年3月开始学的vue, 6月去了新浪, 去了就开始主导金融频道的前端开发, 2个月上线了这个spa(无刷新页面), 同时带其小组的其他3个前端学会用vue.

学习用vue之前他本来就是很优秀的前端, jq/css3/都很熟练, 所以说上手vue基本很容易, 所以大家如果有jq的经验那么学vue会更简单, 而且现在一旦学会了vue在前端里基本就是20%的程序员, 一般公司都会让你去带队.

如果没有接触过前端也不用担心, 因为对比jq要操作dom, vue完全不需要, 不用记住那么多jq操作dom的api(只需要学会几个js的api即可, getBoundingClientRect/querySelector等等), 只需要做数据处理就行, 这样我们上手写代码的质量就很高(上面的2个例子),  哪个单位不想要写代码质量高/可维护的程序员.


## 现在还有react/angular, 为什么选择vue?
从上手程度上讲, vue有一个标签叫做渐进式框架, 渐进式的意思就是我们可以把vue直接通过浏览器script标签在html中引入, 可以当做一个js插件来使用(可以和jq并存), 方便大家慢慢深入了解vue, 如果对vue有了解的同学知道, 整套vue开发还有其他技术点(webpack/scss/es6), 不过我们可以渐进的各个击破.
反观react上手需要学习jsx语法, angular上手需要学习ts, 虽然angular支持标准的js, 但是官网的教程都是基于ts的, 所以想用好angular还要同时学好ts.
#### react
``` javascript
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="world" />,
  mountNode
);
```

#### angular2基于(ngserver)
``` javascript
import { Component } from '@angular/core';
@Component({
  selector: 'mount-node',
  template: `<h1>Hello {{name}}</h1>`
})
export class AppComponent { name = 'world'; }
```

#### vue
``` javascript
<script src="https://unpkg.com/vue"></script>
new Vue({
    el: '#mount-node',
    template: '<h1>Hello {{name}}</h1>',
    data: {
        name: 'world'
    }
});
```
所以总结一下选择vue就是因为他学习曲线平缓, 而后期高度3大框架一致, 均有路由/状态管理等概念. 学会vue后如果想学react/angular都会变的简单, 因为3者核心的概念一致, 跟甚至想学微信小程序也会变得简答, 因为**微信**小程序的语法和概念和vue相似度90%以上.

更详尽的对比可以看vue官网的[一篇文章](https://cn.vuejs.org/v2/guide/comparison.html)

<!-- ![](https://raw.githubusercontent.com/Atom-H/atom-ui-mobile/master/static/image/1.png)
![](https://raw.githubusercontent.com/Atom-H/atom-ui-mobile/master/static/image/2.png)
![](https://raw.githubusercontent.com/Atom-H/atom-ui-mobile/master/static/image/3.png) -->

## 关于IE6/7/8
淘宝/天猫都已经不再支持ie6/7, 我最近2年工作单位也都不在要求支持ie6/7, 虽说要要求支持ie8, 但是如果你去的单位要求vue, 那么自然他只要求兼容到ie9, 再者现在企业都是移动端开发,  手机浏览器vue都支持. pc端后台单位都不会要求兼容ie的, 谷歌好使就行.

## vue在北上广的行情
北上广已经基本都是vue/react/angular3大框架的天下, 可以看下拉钩网的企业招聘要求.
[拉钩网搜索'前端'](https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?labelWords=&fromSearch=true&suginput=)

## 高薪的前端都需要会一门服务端语言
多亏了nodejs, 前端不需要学新的语法就可以写服务端的应用, 所以我会通过给大家而且结合mock.js, 前端可以在和服务端商定数据结构后, 自己写出假数据来进行单元测试, 而不需要等待后端, 效率大大提升.

## 身边的同事

## 有的功能vue都有吗?
2者本质都是用来操作dom的, 但是jq中集成了$.ajax, vue只是用来负责view层的所以, ajax需要单独引入axio类库(官方推荐, 而且很多nodejs开发者也在用)

## 为什么选择学习vue,而不是其他?
1. vue有一个标签叫做渐进式框架, 渐进式的意思就是我们可以把vue直接通过浏览器script标签在html中引入, 可以当做一个js插件来使用(可以和jq并存), 方便大家慢慢深入了解vue,  反观react自创一套jsx语法, 当然也可以直接在浏览器中通过script引入, 但是同时要引入一个jsx解析插件, 语法对于新手来说比较晦涩, 当然不是说react不好, 只是来对比vue上手更简单.


## 只学vue吗?

## es6

## scss

## 编码规范

## 怎么写注释


## 做什么?
做组件库和一个前后台spa

## 善用sf提问


## 学什么一切以企业需求出发