# any-ui [![NPM Version][npm-image]][npm-url] [![downloads-image]][downloads-url] [![size-image]][size-url]
:whale:    更快更简单

[size-url]: https://bundlephobia.com/result?p=vue-atom-ui
[size-image]: https://badgen.net/bundlephobia/minzip/vue-atom-ui

[npm-image]: https://img.shields.io/npm/v/vue-atom-ui.svg
[npm-url]: https://npmjs.org/package/vue-atom-ui

[downloads-image]: https://badgen.net/npm/dt/vue-atom-ui
[downloads-url]: https://npmjs.org/package/vue-atom-ui



## 演示
[预览地址](https://any86.github.io/any-ui/#/index)

## 文档

[查看](https://any86.github.io/any-ui/)

## 在手机上看

![image](https://user-images.githubusercontent.com/8264787/34904356-3395a8d2-f87f-11e7-85f4-7ae1a94fc587.png)


## 安装

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。
```shell
npm i any-ui -S
```

## 引入组件

### 方式1: 按需引入

1. 安装 babel-plugin-import 插件
```shell
npm i babel-plugin-import -d
```

2. .babelrc 或 babel-loader 中添加插件配置
```javascript
// 注意：webpack 1 无需设置 libraryDirectory。
{
  "plugins": [
    ["import", {
      "libraryName": "any-ui",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
```

### 方式2: 全部引入
```javascript
import Vue from 'vue';
import Atom from 'any-ui';
import 'any-ui/index.css';
Vue.use(Atom);
```

**注意:** 一旦配置了 babel-plugin-import, "全部引入"功能会失效, 2者不能并存.

### CDN
```javascript
<!-- 引入css -->
<link rel="stylesheet" href="https://unpkg.com/any-ui/index.css">
<!-- 引入js -->
<script src="https://unpkg.com/any-ui/index.js"></script>
```

### Hello world
未完...

