### 安装
推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。
```shell
npm i vue-atom-ui -S
```

### 引入组件

#### 方式1: 按需引入

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
      "libraryName": "vue-atom-ui",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
```

#### 方式2: 全部引入
```javascript
import Vue from 'vue';
import Atom from 'vue-atom-ui';
import 'vue-atom-ui/index.css';
Vue.use(Atom);
```

:::warning
一旦配置了 babel-plugin-import 全部引入功能会失效, 2者不能并存.
:::


### CDN
```javascript
<!-- 引入css -->
<link rel="stylesheet" href="https://unpkg.com/vue-atom-ui/index.css">
<!-- 引入js -->
<script src="https://unpkg.com/vue-atom-ui/index.js"></script>
```

### Hello world
[[toc]]

