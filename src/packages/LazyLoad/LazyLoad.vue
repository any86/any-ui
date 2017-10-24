<template>
    <img :status="status" :src="url" class="atom-lazyload" :lazy="status">
</template>
<script>
// 借鉴了vue-lazyload, 我这就一简化版
// https://github.com/hilongjw/vue-lazyload
// IntersectionObserver不知道兼容性, 稍后测验, caniuse说支持安卓>=5
// https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API
// 未来想借助了indexeddb对每个图片标记id, 让加载过的图片可以省去一些流程判断.
// 还要加入对每个图片加载事件的统计事件, 方便找出加载慢的图片
import { getWidth, getHeight, getScrollParent, getTime } from '@/utils/dom';
import throttle from 'lodash/throttle';
export default {
    name: 'LazyLoad',

    props: {
        src: {
            type: String
        },

        placeholderBackgroundColor: {
            type: String,
            default: '#fff'
        },

        placeholder: {
            type: String,
            default() {
                return `data:image/svg+xml;utf8,<svg width="1" height="1" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="${this
                    .placeholderBackgroundColor}"/></svg>`;
            }
        },

        throttleTime: {
            type: Number,
            default: 200
        },

        attempt: {
            type: Number,
            default: 3
        },

        errorImg: {
            type: String
        },

        preLoadRate: {
            type: Number,
            default: 1.3
        },

        events: {
            type: Array,
            default() {
                return [
                    'scroll',
                    'wheel',
                    'mousewheel',
                    'resize',
                    'animationend',
                    'transitionend',
                    'webkitAnimationend',
                    'webkitTransitionend',
                    'touchmove'
                ];
            }
        },

        refreshTime: {
            type: Number
            // default: getTime()
            // 一般只有出现2组图片的父元素是通过v-show来控制的情况才需要
            // 如果不愿意用refreshTime去强制触发刷新,
            // 那么就需要在图片元素或者父元素上使用v-if进行控制渲染开始的时机, 来触发mounted中的代码.
        }
    },

    data() {
        return {
            status: 'ready',
            url: '',
            costTime: 0,
            attemptCount: 0,
            scrollParentNode: null
        };
    },

    mounted() {
        // 找到最近的滚动元素, 绑定事件监听
        this.scrollParentNode = getScrollParent(this.$el);
        // 绑定事件
        this.events.forEach(eventName => {
            this.scrollParentNode.addEventListener(
                eventName,
                this.loadInViewImg
            );
        });
        // 初始化加载图片
        this.url = this.placeholder;
        this.loadInViewImg();
    },

    methods: {
        /**
         * 如果没加载, 去监测是否能加载
         * 否则移除监听
         */
        loadInViewImg() {
            // 不cancel能自动释放吗?
            throttle(() => {
                if ('loaded' === this.status) {
                    this.scrollParentNode.removeEventListener(
                        'scroll',
                        this.loadInViewImg
                    );
                } else if ('ready' === this.status) {
                    if (this.checkInView()) {
                        this.loadImg();
                    }
                }
            }, 200)();
        },

        checkInView() {
            const {
                top,
                right,
                bottom,
                left
            } = this.$el.getBoundingClientRect();
            const winWidth = getWidth(window);
            const winHeight = getHeight(window);
            return (
                top < winHeight * this.preLoadRate &&
                bottom > 0 &&
                left < winWidth * this.preLoadRate &&
                right > 0
            );
        },

        loadImg() {
            const startTime = getTime();
            var img = new Image();
            img.src = this.src;
            if (this.attempt > this.attemptCount) {
                this.attemptCount++;
                // 这里有每个图都有placeholder, 所以不能判断img.complete,
                // 也不用判断, 因为每次记载成功后, 第二次加载会自动解除触发绑定的事件
                this.status = 'loading';
                // 加载成功
                img.onload = e => {
                    this.status = 'loaded';
                    this.url = this.src;
                    this.costTime = getTime() - startTime;
                    this.$emit('loaded', {
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                        url: this.url,
                        costTime: this.costTime
                    });
                    img = null;
                };

                // 错误处理
                img.onerror = e => {
                    this.status = 'attempt';
                    this.$emit('attempt', {
                        url: this.url,
                        costTime: this.costTime
                    });
                    this.loadImg();
                };
            } else {
                this.url = this.errorImg;
                this.status = 'fail';
                this.$emit('fail', {
                    url: this.url,
                    costTime: this.costTime
                });
                img = null;
            }
        }
    },

    watch: {
        refreshTime() {
            this.loadInViewImg();
        }
    },

    beforeDestroy() {
        this.events.forEach(eventName => {
            this.scrollParentNode.removeEventListener(
                eventName,
                this.loadInViewImg
            );
        });
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-lazyload {
    width: 100%;
    display: block;
    // &[lazy='loading'] {

    // }
    &[lazy='loaded'] {
        animation: fadeIn 1s;
    }

    // &[lazy='attempt'] {

    // }

    &[lazy='fail'] {
        animation: fadeIn 1s;
    }
}
</style>
