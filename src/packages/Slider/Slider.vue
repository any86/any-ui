<template>
    <div class="component-slider" @touchstart="touchstart" @touchmove.stop.prevent="touchmove" @touchend="touchend">
        <div class="slider-body" :style="{'transition-duration': `${1 == status ?  0 : duration}ms`, transform: `translate3d(${translateXNew}px, 0, 0)`}">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Slider',

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
            this.activeIndex = index;
            this.translateXNew = 0 - this.viewWidth * index;
            this.translateXOld = this.translateXNew;
        },

        touchstart(e) {
            this.status = 0;
            this.startX = e.touches[0].clientX;
            this.startTime = e.timeStamp;
        },

        touchmove(e) {
            this.status = 1;
            this.viewWidth = this.$el.offsetWidth;
            this.distanceX = e.touches[0].clientX - this.startX;
            // const translateXNew = this.translateXOld + this.distanceX;
            // if(0 > translateXNew && this.viewWidth * (this.count - 1) > 0 - translateXNew) {
            this.translateXNew = this.translateXOld + this.distanceX;
            // }
        },

        touchend(e) {
            this.status = 2;
            this.duration = this.speed;
            const costTime = e.timeStamp - this.startTime;
            const dragSpeedX = this.distanceX / costTime;
            const offset = this.translateXNew % this.viewWidth;
            if (this.distanceX > this.viewWidth / 4 || 0.3 <= dragSpeedX) {
                if (0 < this.activeIndex) {
                    this.activeIndex--;
                }
            } else if (0 - this.distanceX > this.viewWidth / 4 || -0.3 >= dragSpeedX) {
                if (this.count - 1 > this.activeIndex) {
                    this.activeIndex++;
                }
            }
            this.translateXNew = 0 - this.activeIndex * this.viewWidth;
            this.translateXOld = this.translateXNew;
            this.$emit('input', this.activeIndex);
        },
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
.component-slider {
    position: relative;
    width: 100%;
    overflow: hidden;
    >.slider-body {
        display: flex;
        transition-duration: 0;
        transition-property: transform;
        transition-timing-function: ease-in-out;
    }
}
</style>
