<template>
    <div v-on="$listeners" :style="{width: `${width}px`}" class="atom-carousel-item">
        <div v-if="$parent.isZoom" class="item__zoom-warp" @touchstart="touchStart" @touchend="touchEnd" :style="{transitionDuration: `${transitionDuration}ms`, transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`}">
            <slot></slot>
            <v-spinner-ripple v-if="ready" class="item__loading" />
        </div>
        <template v-else>
            <slot></slot>
            <v-spinner-ripple v-if="ready" class="item__loading" />
        </template>
    </div>
</template>
<script>
import Finger from '@/utils/finger';
import VSpinnerRipple from '@/packages/Spinner/Ripple';
export default {
    name: 'AtomCarouselItem',

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

        // 识别缩放/移动手势
        if (this.$parent.isZoom) {
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
        }

        // 识别tap/doubleTap
        finger.on('tap', e=>{
            this.$emit('tap', e);
        });

        // 识别tap/doubleTap
        finger.on('doubleTap', e=>{
            this.$emit('doubleTap', e);
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
        touchStart() {
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