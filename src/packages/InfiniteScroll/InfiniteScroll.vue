<template>
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
        }
    },

    data() {
        return {
            viewHeight: 0,
            direction: '',
            scrollTop: 0,
        }
    },

    mounted() {
        this.viewHeight = getHeight(this.$el);
        window.addEventListener('resize', debounce(() => {
            this.viewHeight = getHeight(this.$el);
        }, 200), false);
    },

    methods: {
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
        }
    },

    watch: {
        scrollTop(oldVal, newVal) {
            this.direction = oldVal < newVal ? 'up' : 'down';
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