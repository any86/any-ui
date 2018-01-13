<template>
    <div v-on="$listeners" :style="{width: `${width}px`}" class="atom-carousel-item">
        <div class="item__zoom-warp" @touchstart="touchStart" @touchend="touchEnd" :style="{transitionDuration: `${transitionDuration}ms`, transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`}">
            <slot></slot>
            <v-spinner-ripple v-if="ready" class="item__loading" />
        </div>
    </div>
</template>
<script>
import Finger from '../../utils/finger.js';
import VSpinnerRipple from '@/packages/Spinner/Ripple';
export default {
    name: 'CarouselItem',

    // inject: ['perView'],

    data() {
        return {
            index: 0,
            width: 0,
            hasImage: true,
            ready: false,
            transitionDuration: 0,
            scale: 1,
            x: 0,
            y: 0
        };
    },

    mounted() {
        // this.$parent.isDisabled = true;
        let finger = new Finger(this.$el);

        finger.on('pinch', scale => {
            this.scale *= scale;
            if (1 > this.scale) {
                this.scale = 1;
            }
        });

        finger.on('pressMove', ({ deltaX, deltaY }) => {
            if (1 == this.scale) return;
            let x = this.x + deltaX;
            let y = this.y + deltaY;

            if (this.minZoomTranslateX < x && this.maxZoomTranslateX > x) {
                this.x = x;
            } else if (this.minZoomTranslateX > x) {
                this.resetZoom();
                this.$parent.next(() => {
                    // this.resetZoom();
                });
            } else if (this.maxZoomTranslateX < x) {
                this.resetZoom();
                this.$parent.prev(() => {
                    // this.resetZoom();
                });
            }

            if (this.minZoomTranslateY < y && this.maxZoomTranslateY > y) {
                this.y = y;
            } else {
                // this.$parent.isDisabled = false;
            }
        });

        this.index = this.$parent.count;
        this.$parent.count++;

        this.$nextTick(() => {
            this.width = this.$parent.warpWidth / this.$parent.slidesPerView;
            this.ready = true;

            if (undefined !== this.$parent.imageStore[this.index] && 0 === this.$parent.imageStore[this.index].length) {
                this.hasImage = false;
            }
        });
    },

    methods: {
        touchStart(){
            this.transitionDuration = 0;
        },

        touchEnd() {
            // this.$parent.isDisabled = true;
        },

        resetZoom() {
            this.x = 0;
            this.y = 0;
            this.scale = 1;
            this.transitionDuration = 300;
        }
    },

    computed: {
        minZoomTranslateX() {
            return (this.$parent.warpWidth - this.width * this.scale) / 2;
        },

        maxZoomTranslateX() {
            return 0 - this.minZoomTranslateX;
        },

        minZoomTranslateY() {
            return (this.$parent.warpHeight - this.$parent.warpHeight * this.scale) / 2;
        },

        maxZoomTranslateY() {
            return 0 - this.minZoomTranslateY;
        }
    },

    watch: {
        scale(scale) {
            this.$parent.isDisabled = 1 < scale;
        }
    },

    components: { VSpinnerRipple }
};
</script>
<style scoped lang=scss>
@import '../../scss/variables.scss';
.atom-carousel-item {
    position: relative;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    overflow: hidden;

    .item__zoom-warp {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
        top: 0;
        left: 0;
    }

    > .item__loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 6;
        opacity: 0;
    }

    img[lazy-src] {
        opacity: 0;
        & + .item__loading {
            opacity: 1;
        }
    }

    img[lazy-status='done'] {
        animation: fadeIn 1000ms;
        & + .item__loading {
            display: none;
        }
    }

    /* 关于一页多张图片加载的逻辑, 慢慢想 */
    /* img:not([lazy-status='done']) {
        & + .item__loading {
            display: inline-block;
        }
    } */
}
</style>
