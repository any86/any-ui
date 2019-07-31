# 面试题: 手写collapse(折叠组件)的css/html部分

源码: https://github.com/any86/any-ui/blob/master/src/components/_collapse.scss

## 做一个组件库不难
其实vue/react等框架的出现, 让自己做一个ui变得简单, 大部分的js逻辑都被库封装, 反而组件的代码主要都是css, 所以只要css写好了, 一个组件就完成60%以上了.

## 为自己的职业未来造轮子
vue马上也快出3了, 现存的所有vue组件库都会重建, 这又是一个造轮子收集star的好时机, 如果你也想趁机造一个组件库, 那么开始吧:

## 最终效果

##### 常规版本
![常规版本](https://ws1.sinaimg.cn/large/005IQkzXly1g52x6hy0vkj30c80b3q4b.jpg)


##### 简化版
![简化版](https://ws1.sinaimg.cn/large/005IQkzXly1g52x6qla7ij30c40b80u3.jpg)

## html
```html
<div class="a-collapse a-collapse--simplify">
    <div class="a-collapse__item a-collapse__item--open">
        <header role="button">
            <i class="icon-arrow"></i>
            <p>唐诗</p>
        </header>
        <article role="tabpanel">
            <p>唐诗，泛指创作于唐朝诗人的诗。唐诗是中华民族珍贵的文化遗产之一，是中华文化宝库中的一颗明珠，同时也对世界上许多民族和国家的文化发展产生了很大影响，对于后人研究唐代的政治、民情、风俗、文化等都有重要的参考意义和价值。</p>
        </article>
    </div>

    <div class="a-collapse__item">
        <header>
            <i class="icon-arrow"></i>
            <p>宋词</p>
        </header>
        <article>
            <p>宋代盛行的一种中国文学体裁，宋词是一种相对于古体诗的新体诗歌之一，标志宋代文学的最高成就。宋词句子有长有短，便于歌唱。因是合乐的歌词，故又称曲子词、乐府、乐章、长短...</p>
        </article>
    </div>

    <div class="a-collapse__item">
        <header>
            <i class="icon-arrow"></i>
            <p>元曲</p>
        </header>
        <article>
            <p>元曲，是盛行于元代的一种文艺形式，包括杂剧和散曲，有时专指杂剧。 杂剧，宋代以滑稽搞笑为特点的一种表演形式，元代发展成戏曲形式。每本以四折为主，在开头或折间另加楔子，每折用同宫调同韵的北曲套曲和宾白组成。如关汉卿的《窦娥冤...</p>
        </article>
    </div>
</div>
```

## scss
```scss
// 间距
$space: 4px;
// 单位圆角
$radius: 2px;
// 灰色
$gray-100: #f8f9fa !default;
$gray-300: #dee2e6 !default;

.a-collapse {
    overflow: hidden;
    border-radius: $radius*2;
    border: 1px solid $gray-300;

    &__item {
        &:nth-of-type(n+2) {
            border-top: 1px solid $gray-300;
        }



        >header {
            background-color: $gray-100;
            padding: 2*$space;
            font-size: 14px;
            cursor: pointer;

            >i.icon-arrow {
                width: 1em;
                height: 1em;
                display: inline-block;
                vertical-align: middle;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"/></svg>')
            }

            >p {
                display: inline-block;
                vertical-align: middle;
                font-weight: bold;
            }
        }

        >article {
            display: none;
            padding: $space;
            font-size: 14px;
        }
    }

    // 展开情况下
    &__item {
        &--open {
            >header {
                border-bottom: 1px solid $gray-300;

                >i.icon-arrow {
                    transform: rotate(90deg);
                }
            }

            >article {
                display: block;
            }
        }
    }

    // 简化版本
    &--simplify {
        border: none;

        .a-collapse__item {
            >header {
                border: none;
                background-color: transparent;
            }
        }


    }
}
```

## js
本文并不想讲js, 如果大家感兴趣剩下的js工作就交给大家完成了, 等vue3发布, 届时我会结合ts实现完整的组件, 简要逻辑:
1. 给组件增加一个"手风琴"的选项, 就是只可以同时打开一个"页".
2. 给每次点击**header标签**的时候, 触发"页"的合并和展开.
3. 给"合并/展开"加个动画效果,提示这里需要js计算"页"高度, 才能实现和"饿了么ui中collapse组件"的"合并/展开"一样的动画.

**嘿, 看是不是js的工作并不是很多!**