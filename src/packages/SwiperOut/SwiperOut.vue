<template>
    <div class="component-swiper-out">
        <div class="scroll-body" :style="{transform: `translate3d(${touche.distanceX}px, 0, 0)`, 'transition-duration': `${2 != touche.status ? 200 : 0}ms`}">
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

            touche: {
                status: 0,
                startX: 0,
                startY: 0,
                distanceX: 0,
                distanceY: 0
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
                this.touche.distanceX = 0 - this.actions.width;
            } else {
                this.touche.distanceX = 0;
            }
        },

        touchStart(e) {
            this.touche.status = 1;
            this.touche.startX = e.touches[0].clientX;
            this.touche.startY = e.touches[0].clientY;
            this.$emit('touchstart');
        },

        touchMove(e) {
            this.touche.status = 2;
            var distanceX = (e.touches[0].clientX - this.touche.startX);
            var distanceY = (e.touches[0].clientY - this.touche.startY);
            // 只能从左向右拖拽
            if (0 > distanceX) {
                // 滑动距离不能大于actions宽度
                if (0 - distanceX <= this.actions.width) {
                    this.touche.distanceX = distanceX;
                } else {
                    this.touche.distanceX = 0 - this.actions.width;
                }
            }
            this.$emit('touchmove');

            // 如果X轴拖拽, 禁止页面滚动
            if (Math.abs(distanceY) < Math.abs(distanceX)) {
                e.preventDefault();
            }
        },

        touchEnd(e) {
            this.touche.status = 0;
            if (0 - this.touche.distanceX > this.actions.width / 2) {
                this.touche.distanceX = 0 - this.actions.width;
                this.$emit('input', true);
            } else {
                this.touche.distanceX = 0;
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
            padding: 3*$gutter;
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
