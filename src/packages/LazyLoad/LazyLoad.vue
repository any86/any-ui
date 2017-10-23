<template>
    <img :status="status" :src="url" class="atom-lazyload" :lazy="status">
</template>
<script>
// 借鉴了vue-lazyload, 我这就一简化版
// https://github.com/hilongjw/vue-lazyload
// IntersectionObserver不知道兼容性, 稍后测验
// https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API
import { getWidth, getHeight, getScrollParent } from '@/utils/dom';
import debounce from 'lodash/debounce';
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

        isLoad: {
            type: Boolean,
            default: false
        },

        attempt: {
            type: Number,
            default: 1
        },

        errorImage: {
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
                    'touchmove'
                ];
            }
        }
    },

    data() {
        return {
            status: 'ready',
            rect: {},
            url: '',
            loadTime: 0,
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
                debounce(this.loadInViewImg, 200)
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
            if ('done' === this.status) {
                this.scrollParentNode.removeEventListener(
                    'scroll',
                    this.loadInViewImg
                );
            } else {
                if (this.checkInView()) {
                    this.loadImg();
                }
            }
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
            this.status = 'loading';
            // if(img.compulet);
            let img = new Image();
            img.src = this.src;

            // 加载成功
            img.onload = e => {
                this.status = 'done';
                this.url = this.src;
                this.loadTime = e.timeStamp;
                img = null;
            };

            // 错误处理
            img.onerror = e => {
                this.status = 'fail';
            };
        }
    },

    watch: {
        isLoad(value) {
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
    &[lazy='loading'] {
        display: block;
    }
    &[lazy='done'] {
        animation: fadeIn 1s;
    }
}
</style>
