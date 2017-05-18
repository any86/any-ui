<template>
    <div class="scroll-view" @scroll="scroll">
        <!-- 背景 -->
        <div class="background">
            <slot name="background"></slot>
        </div>
        <!-- 内容容器, 自适应高度 -->
        <div ref="body" :class="{'body-touch-end': 'end' == touch.is, body: true}" :style="{background, transform: 'translate3d(0, ' + translateY + 'px, 0)'}" @touchmove="touchMove" @touchstart="touchStart" @touchend="touchEnd">
            <!-- 主体 -->
            <slot></slot>
            <!-- 阈值触发 -->
            <slot name="threshold"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ScrollView',

    props: {
        pullable: {
            type: Boolean,
            default: true
        },

        background: {
            type: String,
            default: '#FFF'
        },

        scrollTop: {
            type: [Number, String],
            default: 0
        },

        threshold: {
            type: Number,
            default: 50
        }
    },

    mounted() {

    },

    data() {
        return {
            beforeContentHeight: 0,
            timer: null,
            isEnd: false,
            touch: {
                startY: 0,
                endY: 0
            },
            translateY: 0
        };
    },

    watch: {
        scrollTop(value) {
            this.$el.scrollTop = value;
        },

        scrollLeft(value) {
            this.$el.scrollLeft = value;
        }
    },

    methods: {

        touchStart(e) {
            if (this.pullable) {
                this.touch.is = 'start';
                this.touch.startY = e.touches[0].clientY;
                this.$emit('touchstart');
            }
        },

        touchMove(e) {
            if (this.pullable) {
                this.touch.is = 'move';
                this.touch.endY = e.touches[0].clientY;

                // 手指滑动的距离
                var distance = this.touch.endY - this.touch.startY - this.$el.scrollTop;

                if (0 < distance) {
                    // 滑动减速, 太快体验不好
                    this.translateY = distance / 2;
                    e.preventDefault();
                    e.stopPropagation();
                    this.$emit('touchmove');
                }
            }
        },

        touchEnd(e) {
            if (this.pullable) {
                this.touch.is = 'end';
                this.translateY = 0;
                this.$emit('touchend');
            }
        },

        scroll() {
            if (!this.isEnd) {
                clearTimeout(this.timer);

                this.timer = setTimeout(() => {
                    // 滚动条高度
                    this.$emit('update:scrollTop', this.$el.scrollTop);
                    // 外壳高度
                    var warpHeight = this.$el.offsetHeight;
                    // 内容高度
                    var innerHeight = this.$refs.body.offsetHeight;
                    // 距离底部50px就触发
                    if (this.scrollTop + warpHeight + this.threshold > innerHeight) {
                        this.$emit('bottom');
                    }
                }, 200);
            }
        }

    }
}
</script>
<style scoped lang=scss>
.scroll-view {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    >.background {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }
    >.body {
        position: relative;
        z-index: 2;
        overflow: hidden;
    }
    >.body-touch-end {
        /*松手的时候才能加动画, touch-start的时候加拖拉会因为动画不流畅*/
        transition: all .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    }

}
</style>
