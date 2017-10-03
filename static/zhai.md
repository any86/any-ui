## 什么是vue?
一个js框架, 可以让你写更少的代码, 同时代码更容易维护和迭代.

#### 简单的例子
1. **vue**输入框
https://jsfiddle.net/_russell997/kmb0q8og/8/

2. **jq**输入框
https://jsfiddle.net/_russell997/wjb5atk8/10/


## vue有什么好处?
17年开始, 哈尔滨越来越多的用人单位(薪资6k+)的招聘信息中明确要求会用vue或者react等框架, 从自身角度为了涨工资,我们应该学习vue, 或者说vue是进入前端高薪领域一道门, 毕竟我们会的技能越契合企业需求收入越高.

## 现在还有react/angular, 为什么选择vue?
从上手程度上讲, vue有一个标签叫做渐进式框架, 渐进式的意思就是我们可以把vue直接通过浏览器script标签在html中引入, 可以当做一个js插件来使用(可以和jq并存), 方便大家慢慢深入了解vue, 如果对vue有了解的同学知道, 整套vue开发还有其他技术点(webpack/scss/es6), 不过我们可以渐进的各个击破.
反观react上手需要学习jsx语法, angular上手需要学习ts, 虽然angular支持标准的js, 但是官网的教程都是基于ts的, 所以想用好angular还要同时学好ts.
#### react
``` javascript
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
  <HelloMessage name="Jane" />,
  mountNode
);
```


所以总结一下选择vue就是因为他学习曲线平缓, 而后期高度3大框架一致.

<!-- ![](https://raw.githubusercontent.com/Atom-H/atom-ui-mobile/master/static/image/1.png)
![](https://raw.githubusercontent.com/Atom-H/atom-ui-mobile/master/static/image/2.png)
![](https://raw.githubusercontent.com/Atom-H/atom-ui-mobile/master/static/image/3.png) -->


## jq还用不用了?
如果单位还需要兼容ie低版本的浏览器, jq用来做交互少的活动页面最适合, 比如fullpage类型的广告页面和企业官网. 如果只是兼容高版本浏览器的活动页可以直接用原生js, 这样我们页面的体积会更小(**vue**: 28.96kb min+gzip / **jquery-3.2.1.min** : 30.63kb min+gzip), 因为高版本浏览器支持querySelector()和css3动画.
在vue学习初期, 最容易问的2个问题就是如何获取dom尺寸信息和异步请求,获取元素的位置/尺寸等, 可以用js原生的getBoundingClientRect(), 异步请求(ajax)用axios.js(1k min+gzip)

## 关于IE6/7/8
淘宝/天猫都已经不再支持ie6/7, 我最近2年工作单位也都不在要求支持ie6/7, 虽说要要求支持ie8, 但是如果你去的单位要求vue, 那么自然他只要求兼容到ie9, 再者现在企业都是移动端开发,  手机浏览器vue都支持. pc端后台单位都不会要求兼容ie的, 谷歌好使就行.

## vue在北上广的行情
北上广已经基本都是vue/react/angular3大框架的天下, 可以看下拉钩网的企业招聘要求.
[拉钩网搜索'前端'](https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?labelWords=&fromSearch=true&suginput=)

## 高新的前端都需要会一门服务端语言
多亏了nodejs, 前端不需要学新的语法就可以写服务端的应用, 而且结合mock.js, 前端可以在和服务端商定数据结构后, 自己写出假数据来进行单元测试, 而不需要等待后端, 效率大大提升.

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