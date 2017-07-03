<template>
    <div class="component-slider" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div class="slider-body" :style="{'transition-duration': `${1 == status ?  0 : speed}ms`, transform: `translate3d(${translateXNew}px, 0, 0)`}">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Slider',

    props: {
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
            viewWidth: 0,
            activeIndex: 0,
            count: 0,
            status: 0,
            startX: 0,
            distanceX: 0,
            translateXOld: 0,
            translateXNew: 0,
        };
    },

    mounted() {
        this.activeIndex = this.value;
    },

    methods: {
        touchstart(e) {
            this.status = 0;
            this.startX = e.touches[0].clientX;
        },

        touchmove(e) {
            this.status = 1;
            this.viewWidth = this.$el.offsetWidth;
            this.distanceX = e.touches[0].clientX - this.startX;
            const translateXNew = this.translateXOld + this.distanceX;
            if(0 > translateXNew && this.viewWidth * this.count > 0 - translateXNew) {
                this.translateXNew = this.translateXOld + this.distanceX;
            }
        },

        touchend(e) {
            this.status = 2;
            this.viewWidth = this.$el.offsetWidth;

            if (this.viewWidth / 4 < this.distanceX) {
                this.activeIndex--;
            } else if (this.viewWidth / 4 < 0 - this.distanceX) {
                this.activeIndex++;
            }

            if(0 > this.translateXNew && this.viewWidth * this.count > 0 - this.translateXNew) {
                this.translateXNew = 0 - this.activeIndex * this.viewWidth;
            }

            this.translateXOld = this.translateXNew;
        },
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
