<template>
    <div class="scroll-view" @scroll="scroll">
        <div ref="content" class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ScrollView',

    props: {
        threshold: {
            type: Number,
            default: 50
        }
    },

    data() {
        return {
            timer: null,
            isEnd: false
        };
    },

    methods: {
        scroll() {
            if (!this.isEnd) {
                clearTimeout(this.timer);

                this.timer = setTimeout(() => {
                    // 组件高度
                    var viewHeight = this.$el.offsetHeight;
                    // 内容高度
                    var contentHeight = this.$refs.content.scrollHeight;
                    // 滚动条高度
                    var scrollTop = this.$el.scrollTop;

                    this.$emit('update:scrollTop', scrollTop);

                    // 距离底部threshold就触发
                    if (scrollTop + viewHeight + this.threshold > contentHeight) {
                        this.$emit('bottom-out');
                    }
                }, 200);
            }
        }
    },

    watch: {
        scrollTop(value) {
            this.$el.scrollTop = value;
        }
    },

    destory() {
        // this.$el.removeEventListener()
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
    >.content {
        position: relative;
        z-index: 1;
        overflow: hidden;
    }
    >.touch-end {
        /*松手的时候才能加动画, touch-start的时候加拖拉会因为动画不流畅*/
        transition: all .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    }
}
</style>
