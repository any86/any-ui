<template>
    <div class="component-carousel" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div ref="film" :class="['film']" :style="{transform: `translate3d(${translateX}px, 0, 0)`, transition: `transform ${speed}ms`}">
            <slot></slot>
        </div>
        <div v-if="hasNav" class="pages">
            <a v-for="n in count" :class="{active: n - 1 == activeIndex}" @click="chnageItem(n-1)"></a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Carousel',

    props: {
        value: {
            type: Number,
            default: 0
        },

        delay: {
            type: Number,
            default: 2000
        },

        speed: {
            type: Number,
            default: 300
        },

        isLoop: {
            type: Boolean,
            default: false
        },

        autoplay: {
            type: Boolean,
            default: true
        },

        hasNav: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isAnimate: false,
            timer: null,
            count: 0,
            width: 0,
            height: 0,
            touch: {
                status: 0,
                start: 0,
                current: 0,
                distance: 0
            }
        };
    },

    mounted() {
        this.width = this.$el.getBoundingClientRect().width;
        this.play();

        // 应该在main.js中判断下 是什么前缀
        ['webkitTransitionEnd', 'transitionEnd'].forEach(eventName => {
            this.$refs.film.addEventListener(eventName, () => {
                this.isAnimate = false;
            });
        });
    },

    methods: {
        play() {
            if (this.autoplay) {
                this.timer = setInterval(() => {
                    this.next();
                }, this.delay);
            }
        },

        stop() {
            clearInterval(this.timer);
        },

        chnageItem(i) {
            this.activeIndex = i;
        },

        touchstart(e) {
            this.stop();
            this.touch.status = 1;
            this.touch.start = e.touches[0].clientX;
        },

        touchmove(e) {
            this.touch.status = 2;
            this.touch.current = e.touches[0].clientX;
            this.touch.distance = this.touch.current - this.touch.start;
            e.preventDefault();
            e.stopPropagation();
        },

        touchend(e) {
            this.touch.status = 0;
            // 拖拽超过10px
            if (Math.abs(this.touch.distance) > 10) {
                if (0 > this.touch.distance) {
                    this.next();
                } else {
                    this.previous();
                }
            }

            // 重置移动距离
            this.touch.distance = 0;

            this.$nextTick(() => {
                this.play();
            });
        },

        next() {
            if (this.count - 1 > this.activeIndex) {
                this.activeIndex++;
            } else {
                if (this.loop) {
                    this.activeIndex = 0;
                }
            }

        },

        previous() {
            if (0 < this.activeIndex) {
                this.activeIndex--;
            } else {
                if (this.loop) {
                    this.activeIndex = this.count - 1;
                }
            }
        }
    },

    computed: {
        activeIndex: {
            get() {
                return this.value;
            },

            set(index) {
                this.isAnimate = true;
                this.$emit('input', index);
            },
        },

        translateX() {
            if (2 == this.touch.status) {
                return 0 - this.activeIndex * this.width + this.touch.distance;
            } else {
                return 0 - this.activeIndex * this.width;
            }
        }
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
.component-carousel {
    width: 100%;
    overflow: hidden;
    position: relative;
    >.film {
        display: flex;
        position: relative;
        width: 100%;
    }
    >.pages {
        position: absolute;
        z-index: 3;
        left: 50%;
        bottom: 10%;
        transform: translateX(-50%);
        >a {
            margin-right: 5px;
            border-radius: 100%;
            display: inline-block;
            width: 12px;
            height: 12px;
            line-height: 12px;
            text-align: center;
            background: $light;
            color: #fff;
            &.active {
                background: $base;
            }
        }
    }
}
</style>
