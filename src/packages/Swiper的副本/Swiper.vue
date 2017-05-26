<template>
    <div class="component-swiper" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div ref="film" :class="['film']" :style="{transform: `translate3d(${translateX}px, 0, 0)`, transition: `all ${filmSpeed}ms`}">
            <slot></slot>
        </div>
        <div class="pages">
            <a v-for="n in count" :class="{active: n - 1 == activeIndex}" @click="chnageItem(n-1)"></a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Swiper',

    props: {
        delay: {
            type: Number,
            default: 2000
        },

        speed: {
            type: Number,
            default: 1000
        },

        isLoop: {
            type: Boolean,
            default: false
        },

        autoplay: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isAnimate: false,
            activeIndex: 0,
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
        var {
            width,
            height
        } = this.$el.getBoundingClientRect();
        this.width = width;
        this.height = height;
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
            // 拖拽超过1/6
            if (Math.abs(this.touch.distance) > this.width / 6) {
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
                this.activeIndex = 0;
            }

        },

        previous() {
            if (0 < this.activeIndex) {
                this.activeIndex--;
            } else {
                this.activeIndex = this.count - 1;
            }

        }
    },

    watch: {
        activeIndex() {
            this.isAnimate = true;
        }
    },

    computed: {
        filmSpeed() {
            if (1 >= this.touch.status) {
                return this.speed;
            } else {
                return 0;
            }
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
.component-swiper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
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
