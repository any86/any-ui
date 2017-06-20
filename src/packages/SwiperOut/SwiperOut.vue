<template>
    <div class="component-swiper-out">
        <div class="scroll-body" :style="{transform: `translate3d(${touch.translateX}px, 0, 0)`, 'transition-duration': `${2 != touch.status ? 200 : 0}ms`}">
            <!-- 主体 -->
            <main ref="body" class="body" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
                <slot></slot>
            </main>
            <!-- actions -->
            <div ref="actions" class="actions">
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SwiperOut',

    props: {
        value: {
            type: Boolean,
            default: false
        },

        threshold: {
            type: Number,
            default: 0.3
        }
    },

    data() {
        return {
            actions: {
                width: -1
            },

            touch: {
                status: 0,
                startX: 0,
                startY: 0,
                distanceX: 0,
                distanceY: 0,
                translateX: 0
            }
        };
    },

    mounted() {
        this.actions.width = this.$refs.actions.offsetWidth;
        this.seekPosition();
    },

    methods: {
        seekPosition() {
            if (this.value) {
                this.touch.translateX = 0 - this.actions.width;
            } else {
                this.touch.translateX = 0;
            }
        },

        touchStart(e) {
            this.touch.status = 1;
            this.touch.startX = e.touches[0].clientX;
            this.touch.startY = e.touches[0].clientY;
            this.$emit('touchstart');
        },

        touchMove(e) {
            this.touch.status = 2;
            this.touch.distanceX = e.touches[0].clientX - this.touch.startX;
            this.touch.distanceY = e.touches[0].clientY - this.touch.startY;

            // 当前关闭状态
            if (!this.value) {
                // 向左拖拽
                if (0 > this.touch.distanceX) {
                    // 滑动距离不能大于actions宽度
                    if (0 - this.touch.distanceX <= this.actions.width) {
                        this.touch.translateX = this.touch.distanceX;
                    } else {
                        this.touch.translateX = 0 - this.actions.width;
                    }
                // 拖拽展开中, 向回滑动    
                } else {
                    this.touch.translateX = 0;
                }
            // 当前打开状态
            } else {
                if (0 < this.touch.distanceX) {
                    if(this.touch.distanceX <= this.actions.width) {
                        this.touch.translateX = (0 - this.actions.width) + this.touch.distanceX;
                    } else  {
                        this.touch.translateX = 0;
                    }
                }
            }
            this.$emit('touchmove');

            // 如果X轴拖拽, 禁止页面滚动
            if (Math.abs(this.touch.distanceY) < Math.abs(this.touch.distanceX)) {
                e.preventDefault();
            }
        },

        touchEnd(e) {
            this.touch.status = 0;
            if (0 - this.touch.distanceX > this.actions.width / 2) {
                this.touch.translateX = 0 - this.actions.width;
                this.$emit('input', true);
            } else {
                this.touch.translateX = 0;
                this.$emit('input', false);
            }
            this.$emit('touchend');
        }
    },

    watch: {
        value() {
            this.seekPosition();
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-swiper-out {
    position: relative;
    background: $background;
    overflow: hidden;
    >.scroll-body {
        display: flex;
        transition-property: transform;
        transition-timing-function: ease;
        position: relative;
        height: 100%;
        >.body {
            position: relative;
            flex: 1 0 100%;
            min-width: 0;
        }
        >.actions {
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translate3d(100%, 0, 0);
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
        }
    }
}
</style>
