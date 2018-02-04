<template>
    <div class="atom-scroll-view" @scroll="scroll">
        <slot></slot>
    </div>
</template>
<script>
import { getHeight, getScrollTop } from '../../utils/dom';
import debounce from 'lodash/debounce';
export default {
    name: 'AtomScrollView',

    props: {
        /** 
         * 滚动条高度
        */
        value: {
            type: Number,
            default: 0
        },
        /**
         * 阈值
         */
        threshold: {
            type: Number,
            default: 50
        },
        /**
         * 是否开启滚动监听
         */
        isListenBottom: {
            type: Boolean,
            default: true
        },
        /**
         * 键盘弹出offset
         */
        keyboardOffset: {
            type: Number,
            default: 60
        }
    },

    data() {
        return {
            viewHeight: 0,
            winHeight: 0,
            direction: '',
            scrollTop: 0,
            formInput: null
        };
    },

    mounted() {
        this.viewHeight = getHeight(this.$el);
        window.addEventListener('resize', this._resizeCalc);
        this._markInput();
    },

    methods: {
        /**
         * 控制运行频率
         */
        _resizeCalc() {
            debounce(() => {
                this.viewHeight = getHeight(this.$el);
                this.winHeight = getHeight(window);
                let node = this.formInput;
                if (null !== node) {
                    // node.scrollIntoView(false);
                    // 自己模拟scrollIntoView
                    // 这样就可以通过keyboardOffset进一步控制滚动距离
                    const { bottom, height, top } = node.getBoundingClientRect();
                    const scrollTop = this.$el.scrollTop + top - this.winHeight + height + this.keyboardOffset;
                    this.scrollTo(scrollTop);
                    node = null;
                }
            }, 200)();
        },
        /** 
         * 标记input/textarea
         * 当resize的时候获取标记元素的尺寸信息
        */
        _markInput() {
            // 对内部的input和textara做自动聚焦处理
            // 防止软键盘遮挡
            this.$el.addEventListener('click', e => {
                var node = e.target;
                var nodeName = node.nodeName.toLowerCase();
                // 标记正在交互的input/textarea元素
                if ('input' === nodeName || 'textarea' === nodeName) {
                    this.formInput = node;
                }
            });
        },
        /**
         * 检查是否到底
         */
        _checkBottom: debounce(function() {
            if (this.isListenBottom && 'down' == this.direction) {
                this.contentHeight = getHeight(this.$el, { isScroll: true });
                // 超过阈值
                if (this.contentHeight < this.scrollTop + this.viewHeight + this.threshold) {
                    this.$emit('scroll-bottom', this.scrollTop);
                }
            }
        }, 200),
        /**
         * 相应滚动事件
         */
        scroll() {
            this.scrollTop = getScrollTop(this.$el);
            // 强制每次刷新高度 2018-02-01
            // 防止初始化时是隐藏状态而获取不到高度
            // 稍后增加Api, 实现手动刷新高度
            this.viewHeight = getHeight(this.$el);
            this._checkBottom();
            this.$emit('input', this.scrollTop);
        },
        /**
         * 滚动到指定位置
         * @argument {Number} 
         */
        scrollTo(top) {
            this.$el.scrollTop = top;
        }
    },

    watch: {
        value(value) {
            this.scrollTo(value);
        },

        scrollTop(oldVal, newVal) {
            this.direction = oldVal < newVal ? 'up' : 'down';
        },

        direction(v) {
            this.$emit('change-direction', v);
        }
    },

    destroyed() {
        window.removeEventListener('resize', this._resizeCalc);
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-scroll-view {
    /*暂时关闭x轴拖动 pinch-zoom*/
    position: relative;
    touch-action: pan-y;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>