<template>
    <div :class="['scroll-view', ovh && 'ovh']" @scroll="scroll">
        <div ref="content" class="scroll-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import Dom from '@/packages/Tools/dom.js'
export default {
    name: 'ScrollView',

    props: {
        keyboardOffset: {
            type: Number,
            default: 0
        },

        preLoad: {
            type: Number,
            default: 1.3
        },

        ovh: {
            type: Boolean,
            default: false
        },

        value: {
            type: Number,
            default: 0
        },

        speed: {
            type: Number,
            default: 300
        }
    },

    data() {
        return {
            timer: null,
            viewHeight: 0,
            isAnimateScrolling: false,
            isHandScrolling: false,
        };
    },

    mounted() {
        this.viewHeight = this.$el.offsetHeight;
        window.addEventListener('resize', this._getViewHeight);

        // 对内部的input和textara做自动聚焦处理
        // 防止软键盘遮挡
        this.$refs.content.addEventListener('click', e => {
            var node = e.target;
            var nodeName = node.nodeName.toLowerCase();

            // 滚动input到软键盘上方
            const scrollInView = e => {
                var { bottom, height, top } = node.getBoundingClientRect();
                this.$el.scrollTop = this.$el.scrollTop + top - window.innerHeight + height + this.keyboardOffset;
                // 只触发一次
                e.target.removeEventListener(e.type, scrollInView);
            }

            if ('input' === nodeName || 'textarea' === nodeName) {
                window.addEventListener('resize', scrollInView, false);
            }
        }, false);
    },

    methods: {
        _getViewHeight() {
            this.viewHeight = this.$el.offsetHeight;
        },

        scroll() {
            const scrollTop = this.$el.scrollTop;
            this.$emit('scroll', scrollTop);
            if (!this.isAnimateScrolling) {
                // 手动拖拽
                this.isHandScrolling = true;
                // 滚动条高度

                this.$emit('input', scrollTop);

                // 内容高度
                var contentHeight = this.$refs.content.offsetHeight;
                // 滚动条高度 + 可是区高度 + 偏移量 > 内容高度
                if (this.preLoad * (scrollTop + this.viewHeight) > contentHeight) {
                    this.$emit('reach-bottom');
                }
                // 监测是否停止滚动
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.isHandScrolling = false;
                }, 200);
            }
        }
    },

    watch: {
        value(to, from) {
            if (!this.isHandScrolling) {
                this.isAnimateScrolling = true;
                Dom.animate(from, to, this.speed, value => {
                    this.$el.scrollTop = value;
                }, value => {
                    this.$emit('input', value);
                    setTimeout(() => {
                        this.isAnimateScrolling = false;
                    }, 200)
                });
            }
        }
    },

    destroyed() {
        window.removeEventListener('resize', this._getViewHeight);
    }
}
</script>
<style scoped lang=scss>
.scroll-view {
    /*暂时关闭x轴拖动 pinch-zoom*/
    touch-action: pan-y;
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .scroll-content {
        position: relative;
        min-height: 100%;
        width: 100%;
    }
    .touch-end {
        /*松手的时候才能加动画, touch-start的时候加拖拉会因为动画不流畅*/
        transition: all .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    }
    &.ovh {
        overflow: hidden;
    }
}
</style>
