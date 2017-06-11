<template>
    <div class="scroll-view" @touchstart="touchstart" @touchmove.stop.prevent="touchmove" @touchend="touchend">
        <div ref="content" class="content" :style="{transform: `translate3d(0, ${touch.translateYNew}px, 0)`}">
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
            isEnd: false,
            touch: {
                status: 0,
                start: 0,
                distance: 0,
                translateYOld: 0,
                translateYNew: 0,
            }
        };
    },
    methods: {
        touchstart(e){
            this.touch.status = 0;
            this.touch.start = e.touches[0].clientY;
           syslog(e.touches[0].clientY, this.touch.start)
        },
        
        touchmove(e){
            this.touch.status = 1;
            this.touch.distance = e.touches[0].clientY - this.touch.start;
             syslog(e.touches[0].clientY, this.touch.start)
            this.touch.translateYNew = this.touch.translateYOld + this.touch.distance;
        },
        
        touchend(e){
            this.touch.status = 2;
            this.touch.translateYOld = this.touch.translateYNew;
        },
        
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
    overflow-y: hidden;
    >.content {
        position: relative;
    }
    >.touch-end {
        /*松手的时候才能加动画, touch-start的时候加拖拉会因为动画不流畅*/
        transition: all .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    }
}
</style>
