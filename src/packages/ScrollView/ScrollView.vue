<template>
    <div :class="['scroll-view', ovh && 'ovh']" @scroll="scroll">
        <div ref="content" class="scroll-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ScrollView',

    props: {
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
        }
    },

    data() {
        return {
            timer: null,
            viewHeight: -1,
        };
    },

    mounted() {
        this.viewHeight = this.$el.offsetHeight;
        window.addEventListener('resize', () => {
            this.viewHeight = this.$el.offsetHeight;
        });
    },

    methods: {
        scroll() {
            clearTimeout(this.timer);
                // 滚动条高度
                const scrollTop = this.$el.scrollTop;
                this.$emit('input', scrollTop);
                // 内容高度
                var contentHeight = this.$refs.content.offsetHeight;
                // 滚动条高度 + 可是区高度 + 偏移量 > 内容高度
                if (this.preLoad * (scrollTop + this.viewHeight) > contentHeight) {
                    this.$emit('reach-bottom');
                }
        }
    }
}
</script>
<style scoped lang=scss>
.scroll-view {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    
    .scroll-content{position: relative;min-height: 100%;}

    .touch-end {
        /*松手的时候才能加动画, touch-start的时候加拖拉会因为动画不流畅*/
        transition: all .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    }

    &.ovh{overflow: hidden;}
}
</style>
