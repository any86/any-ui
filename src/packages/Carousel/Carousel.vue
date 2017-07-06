<template>
    <div class="component-carousel" @touchstart="touchstart" @touchmove.stop.prevent="touchmove" @touchend="touchend">
        <div class="carousel-body" :style="{'transition-duration': `${duration}ms`, transform: `translate3d(${translateXNew}px, 0, 0)`}" @transitionend="transitionend">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Carousel',

    props: {
        value: {
            type: [Number, String],
            default: 0
        },

        speed: {
            type: Number,
            default: 300
        }
    },

    data() {
        return {
            isMove: false,
            isMoveToLeft: false,
            isMoveToRight: false,
            viewWidth: 0,
            activeIndex: 0,
            count: 0,
            status: 0,
            startX: 0,
            startY: 0,
            startTime: 0,
            distanceX: 0,
            distanceY: 0,
            translateXOld: 0,
            translateXNew: 0,
            translateYOld: 0,
            translateYNew: 0,
            duration: 0,
        };
    },

    mounted() {
        this.activeIndex = this.value;
        this.viewWidth = this.$el.offsetWidth;
        this.slideTo(this.value, 0);
    },

    methods: {
        slideTo(index, speed) {
            this.duration = speed;
            this.translateXNew = 0 - this.viewWidth * (index + 1);
            this.translateXOld = this.translateXNew;
        },

        touchstart(e) {
            if (!this.isMove) {
                this.duration = 0;
                this.startX = e.touches[0].clientX;
                this.startTime = e.timeStamp;
            }
        },

        touchmove(e) {
            if (!this.isMove) {
                this.distanceX = e.touches[0].clientX - this.startX;
                if(0 < this.distanceX) {
                    this.isMoveToRight = true;
                    this.isMoveToLeft = false;
                } else {
                    this.isMoveToRight = false;
                    this.isMoveToLeft = true;
                }
                // const translateXNew = this.translateXOld + this.distanceX;
                // if(0 > translateXNew && this.viewWidth * (this.count - 1) > 0 - translateXNew) {
                this.translateXNew = this.translateXOld + this.distanceX;
                // }
            }
        },

        touchend(e) {
            this.isMove = true;
            this.duration = this.speed;
            const costTime = e.timeStamp - this.startTime;
            const dragSpeedX = this.distanceX / costTime;
            const offset = this.translateXNew % this.viewWidth;
            // 正向
            if (0 > this.distanceX) {
                if (0 - this.distanceX > this.viewWidth / 4 || -0.3 >= dragSpeedX) {
                    this.translateXNew = 0 - this.viewWidth * 2;
                } else {
                    // 复位
                    this.translateXNew = 0 - this.viewWidth;
                }
                // 反向
            } else {
                if (this.distanceX > this.viewWidth / 4 || 0.3 <= dragSpeedX) {
                    this.translateXNew = 0;
                } else {
                    // 复位
                    this.translateXNew = 0 - this.viewWidth;
                }
            }
            this.translateXOld = this.translateXNew;
        },

        transitionend() {
            this.duration = 0;
            this.isMove = false;
            // 已经进入下一幅
            if (this.translateXNew == 0 - this.viewWidth * 2) {
                this.activeIndex = this.nextIndex;
            } else if (this.translateXNew == 0) {
                this.activeIndex = this.previousIndex;
            }
            this.translateXNew = 0 - this.viewWidth;
            this.translateXOld = this.translateXNew;
        }
    },

    computed: {
        nextIndex() {
            const nextIndex = this.activeIndex + 1;
            if (this.count > nextIndex) {
                return nextIndex;
            } else {
                return 0;
            }
        },

        previousIndex() {
            if (0 < this.activeIndex) {
                return this.activeIndex - 1;
            } else {
                return this.count - 1;
            }
        }
    },

    watch: {
        value(value) {
            this.slideTo(value, this.speed);
        }
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
$height: .5rem;
.component-carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
    >.carousel-body {
        display: flex;
        transition-duration: 0;
        transition-property: transform;
        transition-timing-function: ease-in-out;
    }
}
</style>
