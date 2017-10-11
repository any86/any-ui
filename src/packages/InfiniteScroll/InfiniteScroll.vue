<template>
    <!-- 注意在组件上设置display: flex 会出现怪异的问题, 请慎用 -->
    <div class="component-infinite-scroll" @scroll="scroll">
        <slot></slot>
    </div>
</template>
<script>
import { getHeight, getScrollTop } from '@/utils/dom'
import debounce from 'lodash/debounce'
export default {
    name: 'InfiniteScroll',

    model: {
        prop: 'value',
        event: 'scroll'
    },

    props: {
        value: {
            type: Number,
            default: 0
        },

        threshold: {
            type: Number,
            default: 50
        },

        isListenBottom: {
            type: Boolean,
            default: false
        },

        keyboardOffset: {
            type: Number,
            default: 10
        }
    },

    data() {
        return {
            viewHeight: 0,
            winHeight: 0,
            direction: '',
            scrollTop: 0,
            $activeFormEl: null,
        }
    },

    mounted() {
        this.viewHeight = getHeight(this.$el);
        window.addEventListener('resize', debounce(() => {
            this.viewHeight = getHeight(this.$el);
            this.winHeight = getHeight(window);
        }, 200));

        this._markInput();
    },

    methods: {
        _resizeCalc(){
            
        },
        
        _markInput() {
            // 对内部的input和textara做自动聚焦处理
            // 防止软键盘遮挡
            this.$el.addEventListener('click', e => {
                var node = e.target;
                var nodeName = node.nodeName.toLowerCase();
                // 标记正在交互的input/textarea元素
                if ('input' === nodeName || 'textarea' === nodeName) {
                    this.$activeFormEl = node;
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
            this._checkBottom();
            this.$emit('scroll', this.scrollTop);
        },

        scrollTo(top) {
            this.$el.scrollTop = top;
        }
    },

    watch: {
        scrollTop(oldVal, newVal) {
            this.direction = oldVal < newVal ? 'up' : 'down';
        },

        winHeight(winHeight) {
            let node = this.$activeFormEl;
            if (null !== node) {
                // node.scrollIntoView(false);
                // 自己模拟scrollIntoView
                // 这样就可以通过keyboardOffset进一步控制滚动距离
                const { bottom, height, top } = node.getBoundingClientRect();
                const scrollTop = this.$el.scrollTop + top - winHeight + height + this.keyboardOffset;
                this.scrollTo(scrollTop);
                node = null;
            }
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-infinite-scroll {
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