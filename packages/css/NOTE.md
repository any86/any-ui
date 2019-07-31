# 记录开发中学到的

## 为什么给tr设置border无效
![](https://ws1.sinaimg.cn/large/005IQkzXly1g4yixr4yvjj310e076gmm.jpg)
**回答**: 需要css设置`border-collapse: collapse;`,边框不折叠的表格的行/列/行组是不具有border的.
