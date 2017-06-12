<template>
    <div class="scroll-view" @touchstart="touchstart" @touchmove.stop.prevent="touchmove" @touchend="touchend">
        <div ref="content" class="content" :class="{'auto-shrink': 2 == touch.status}" :style="{transform: `translate3d(0, ${touch.translateYNew}px, 0)`, 'transition-duration': `${duration}ms`}">
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
            viewHeight: -1,
            contentHeight: -1,
            duration: 0,
            timer: null,
            isEnd: false,
            touch: {
                status: 0,
                start: 0,
                startTime: 0,
                costTime: 0,
                distance: 0,
                translateYOld: 0,
                translateYNew: 0,
            }
        };
    },

    mounted() {
        this.viewHeight = this.$el.scrollHeight;
    },

    methods: {
        touchstart(e) {
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return
            }
            // 关于其他元素的排除还没写完

            this.touch.status = 0;
            this.duration = 0;
            this.touch.startTime = e.timeStamp;
            this.touch.start = e.touches[0].clientY;
            this.contentHeight = this.$refs.content.scrollHeight;

        },

        touchmove(e) {
            this.touch.status = 1;
            this.touch.distance = e.touches[0].clientY - this.touch.start;
            this.touch.translateYNew = this.touch.translateYOld + this.touch.distance;

        },

        touchend(e) {
            this.touch.status = 2;
            this.touch.costTime = e.timeStamp - this.touch.startTime;
            this.duration = 800;
            // 模拟加速度
            // 稍后用js做精准动画控制 or tween.js
            if (200 > this.touch.costTime) {
                var additional = Math.abs(this.touch.distance) * 10;
                //向上拖拽
                if (0 < this.touch.distance) {
                    var translateYNew = this.touch.translateYNew + additional;
                    if (0 < translateYNew) {
                        this.touch.translateYNew = 0;
                        this.$emit('reach-top');
                    } else {
                        this.touch.translateYNew += additional;
                    }
                    // 向下拖拽    
                } else {
                    // maxDistance 为负
                    const maxDistance = this.viewHeight - this.contentHeight;
                    var translateYNew = this.touch.translateYNew - additional;

                    if (maxDistance > translateYNew) {
                        this.touch.translateYNew = maxDistance;
                        this.$emit('reach-bottom');
                    } else {
                        this.touch.translateYNew -= additional;
                    }
                }
            }
            this.touch.translateYOld = this.touch.translateYNew;
        },
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
    >.auto-shrink {
        /*松手的时候才能加动画, touch-start的时候加拖拉会因为动画不流畅*/
        /*transition: transform .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);*/
        /*transition: transform cubic-bezier(0.4, 0, 0.2, 1);*/
        transition: transform cubic-bezier(0, 0.97, 0.58, 1);
    }
}
</style>
