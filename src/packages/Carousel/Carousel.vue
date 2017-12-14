<template>
    <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" class="atom-carousel">
        <div ref="body" :style="{transform: `translate3d(${translateX}px, 0, 0)`, transitionDuration: `${transitionDuration}ms`}" @transitionEnd="transitionEnd" @webkitTransitionEnd="transitionEnd" class="atom-carousel__body">
            <slot></slot>
        </div>
        <div class="atom-carousel__paging">
            <span v-for="n in count" :key="n" :class="{'paging__button--active': n - 1 === realIndex}" class="paging__button"></span>
        </div>
    </div>
</template>

<script>
import { getWidth } from '@/utils/dom';
/**
 * 1. 图片懒加载通过对img标签上的src-lazy设置图片地址
 */
export default {
    name: 'Carousel',

    // provide: {
    //     perView: 1
    // },

    props: {
        value: {
            default: 0
        },

        slidesPerView: {
            type: [Number, String],
            default: 1
        },

        isLoop: {
            type: Boolean,
            default: true
        },

        spaceBetween: {
            type: [Number, String],
            default: 0
        },

        threshold: {
            type: Number,
            default: 15
        },

        autoplay: {
            type: [Object, Boolean],
            default: () => ({
                delay: 3000,
                disableOnInteraction: false,
                stopOnLast: false
            })
        },

        speed: {
            type: Number,
            default: 300
        },

        lazy: {
            type: [Object, Boolean],
            default: () => ({
                loadPrevNext: true,
                loadPrevNextAmount: 1
            })
        }
    },

    data: () => ({
        count: 0,
        warpWidth: 0,
        activeIndex: 0,
        isAnimating: false,
        startPointX: 0,
        transitionDuration: 0,
        translateX: 0,
        startTranslateX: 0,
        afterSliderTransitonend: () => {},
        timer: null,
        imgStore: []
    }),

    mounted() {
        this.warpWidth = getWidth(this.$el);

        if (this.isLoop) {
            this.cloneNodeForLoop();
        }
        // 需要在cloneNodeForLoop后面执行
        this.imgToStore();
        this.slideTo(this.value, 0);

        // 自动播放
        if (this.isLoop) {
            this.playLoopSlider();
        } else {
            this.playSlider();
        }
    },

    methods: {
        /**
         * 构造loop所需dom结构
         */
        cloneNodeForLoop() {
            let headFakeNode = this.$children[this.$children.length - 1].$el.cloneNode(true);
            let lastFakeNode = this.$children[0].$el.cloneNode(true);
            headFakeNode.style.order = -1;
            lastFakeNode.style.order = this.count;
            this.$refs.body.insertBefore(headFakeNode, this.$children[0].$el);
            this.$refs.body.appendChild(lastFakeNode);
        },

        /**
         * 存储所有lazy-src的图片地址, 还包括所在img元素/status
         */
        imgToStore() {
            // 遍历所有lazy-src
            // 不能用$children, 因为还要传递el. $children没法区分fake/real
            this.$el.querySelectorAll('.atom-carousel-item').forEach(($item, index) => {
                this.imgStore[index] = [];
                $item.querySelectorAll('img').forEach($imgEl => {
                    $imgEl.setAttribute('lazy-status', 'ready');
                    this.imgStore[index].push({
                        el: $imgEl,
                        url: $imgEl.attributes['lazy-src'].value,
                        status: 'ready'
                    });
                });
            });
        },

        /**
        * 预加载图片
         */
        loadImage(src, callback) {
            let img = new Image();
            img.src = src;
            img.setAttribute('lazy-status', 'loading');
            img.onload = event => {
                img.setAttribute('lazy-status', 'done');
                img = null;
                callback(img);
            };
        },

        loadImageByActiveIndex(activeIndex) {
            // 每页的图片
            const pageImgStore = this.imgStore[activeIndex + (this.isLoop ? 1 : 0)];
            // 判断active是否有效
            if (undefined !== pageImgStore) {
                pageImgStore.forEach(item => {
                    this.loadImage(item.url, info => {
                        item.el.src = item.url;
                        item.el.setAttribute('lazy-status', 'done');
                        item.el.removeAttribute('lazy-src');
                        item.status = 'done';
                    });
                });
            }
        },

        /**
         * 自动播放(false === isLoop)
         */
        playSlider() {
            // 正向播放
            this.timer = setInterval(() => {
                // 翻页
                this.activeIndex++;
                if (this.count <= this.activeIndex) {
                    this.activeIndex = 0;
                }
                this.slideTo(this.activeIndex, this.speed);
            }, this.autoplay.delay);
        },

        /**
         * 自动播放(true === isLoop)
         */
        playLoopSlider() {
            this.timer = setInterval(() => {
                // 累加页码
                this.activeIndex++;

                if (this.count + 1 === this.activeIndex) {
                    // 从尾部的fake页 => 0
                    this.slideTo(0, 0);
                    this.$nextTick(() => {
                        this.slideTo(1);
                    });
                } else if (this.count === this.activeIndex) {
                    // 从最后一页=> 尾部的fake页;
                    this.slideTo(this.activeIndex, this.speed, activeIndex => {
                        this.slideTo(0, 0);
                    });
                } else if (-1 === this.activeIndex) {
                    this.slideTo(this.activeIndex, this.speed, activeIndex => {
                        this.slideTo(this.count - 1, 0);
                    });
                } else {
                    this.slideTo(this.activeIndex, this.speed);
                }
            }, this.autoplay.delay);
        },

        /**
         * 停止播放
         */
        stopSlider(){
            clearInterval(this.timer);
        },

        /**
         * 获取动画过程中的body的实时的translateX
         */
        getTranslateX() {
            // https://github.com/nolimits4web/Swiper/blob/master/src/utils/utils.js
            // 写的兼容性不完整, 后期修改参考swiper.js的getTranslate
            const style = getComputedStyle(this.$refs.body, null);
            const matrix = style.transform.split(',');
            return Math.round(matrix[4]);
        },

        /**
         * 收集起始位置信息
         */
        touchStart(e) {
            e.stopPropagation();
            // e.preventDefault();
            const point = e.touches ? e.touches[0] : e;
            this.startPointX = point.pageX;
            this.startTranslateX = this.translateX;
            this.transitionDuration = 0;
        },

        /**
         * 计算滑动距离等逻辑
         */
        touchMove(e) {
            e.stopPropagation();
            e.preventDefault();

            const point = e.touches ? e.touches[0] : e;
            const deltaX = point.pageX - this.startPointX;
            const absDeltaX = Math.abs(deltaX);
            if (this.isAnimating) {
                const currentTranslateX = this.getTranslateX();
                this.startTranslateX = currentTranslateX;
                this.translateX = this.startTranslateX;
                this.isAnimating = false;
            }

            // 超过阈值, 才可以滑动
            if (this.threshold < absDeltaX) {
                this.translateX = this.startTranslateX + deltaX - deltaX / absDeltaX * this.threshold;
            }

            // 边界逻辑, 自动复位等
            if (this.isLoop) {
                if (this.count === this.activeIndex) {
                    // 正翻, 超过count代表已经到达尾部的fake
                    const offset = this.startTranslateX % this.warpWidth;
                    // 2种情况
                    // 1. 从静止状态拖拽
                    // 2. 从运动状态拖拽
                    if (0 === offset) {
                        this.slideTo(0, 0);
                    } else {
                        this.translateX = offset;
                        this.startTranslateX = this.translateX;
                        this.activeIndex = 0;
                    }
                } else if (-1 === this.activeIndex) {
                    // 回翻,
                    const offset = this.startTranslateX % this.warpWidth;
                    if (0 === offset) {
                        this.slideTo(this.count - 1, 0);
                    } else {
                        this.translateX = this.minTranslateX + (this.warpWidth + offset);
                        this.startTranslateX = this.translateX;
                        this.activeIndex = this.count - 1;
                    }
                }
            }
        },

        /**
         * 自动捏合等逻辑
         */
        touchEnd(e) {
            const point = e.changedTouches ? e.changedTouches[0] : e;
            const deltaX = point.pageX - this.startPointX;
            const absDeltaX = Math.abs(deltaX);
            const absTranlateX = Math.abs(this.translateX);

            // 判断边界
            if (this.maxTranslateX >= this.translateX && this.minTranslateX <= this.translateX) {
                // 针对isLoop做activeIndex的偏移
                let activeIndex = absTranlateX / this.warpWidth - 1 + (this.isLoop ? 0 : 1);
                if (0.1 < 0 - deltaX / absDeltaX * Math.abs(activeIndex)) {
                    this.activeIndex = Math.ceil(activeIndex);
                } else {
                    this.activeIndex = Math.floor(activeIndex);
                }
            }

            this.slideTo(this.activeIndex);
        },
        /**
         * 滑动到指定activeIndex
         * @argument {Int} activeIndex
         * @argument {Number} duration 速度
         * @argument {Function} callback 滑动动画结束后触发
         * */
        slideTo(index, duration = this.speed, callback = () => {}) {
            this.isAnimating = 0 < duration && true;
            this.transitionDuration = duration;
            this.activeIndex = index;
            this.translateX = ((this.isLoop ? -1 : 0) - index) * this.warpWidth;
            this.startTranslateX = this.translateX;
            this.afterSliderTransitonend = callback;
        },

        /**
         * 动画结束后, 复位状态/触发回调
         */
        transitionEnd() {
            this.isAnimating = false;
            this.transitionDuration = 0;
            this.afterSliderTransitonend(this.activeIndex);
        }
    },

    watch: {
        value(value) {
            // 停止自动播放
            this.stopSlider();

            // 是否恢复播放
            if (!this.autoplay.disableOnInteraction) {
                if (this.isLoop) {
                    this.playLoopSlider();
                } else {
                    this.playSlider();
                }
            }

            // 到达尾部停止自动播放
            if (this.autoplay.stopOnLast && this.lastIndex === this.realIndex) {
                this.stopSlider();
            }

            // 只能返回总数范围内的
            if (this.count > this.activeIndex && -1 < this.activeIndex) {
                this.slideTo(value);
            }
        },

        activeIndex(activeIndex) {
            this.$emit('change', {
                realIndex: this.realIndex,
                activeIndex: this.activeIndex
            });
        },

        /**
         * 触发lazy加载
         */
        realIndex: {
            immediate: true,

            async handler(realIndex) {
                // dom加载完成后触发
                await this.$nextTick();

                // 加载当前图片
                this.loadImageByActiveIndex(realIndex);

                // 预加载next/prev的图片
                if (this.lazy.loadPrevNext && 0 < this.lazy.loadPrevNextAmount) {
                    this.loadImageByActiveIndex(realIndex - this.lazy.loadPrevNextAmount);
                    this.loadImageByActiveIndex(realIndex + this.lazy.loadPrevNextAmount);
                }

                // 针对边界对fake的图片也同时加载
                if (0 === realIndex) {
                    this.loadImageByActiveIndex(this.count);
                } else if (this.lastIndex === realIndex) {
                    this.loadImageByActiveIndex(-1);
                }

                this.$emit('input', realIndex);
            }
        }
    },

    computed: {
        maxTranslateX() {
            return 0;
        },

        minTranslateX() {
            return 0 - (this.count - (this.isLoop ? -1 : 1)) * this.warpWidth;
        },

        maxStep() {
            return this.warpWidth / this.slidesPerView;
        },

        lastIndex() {
            return this.count - 1;
        },

        realIndex() {
            let realIndex = this.activeIndex;
            if (this.count === this.activeIndex) {
                realIndex = 0;
            } else if (-1 === this.activeIndex) {
                realIndex = this.count - 1;
            }
            return realIndex;
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 0.5rem;
.atom-carousel {
    position: relative;
    width: 100%;
    overflow: hidden;

    &__body {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        transition-timing-function: ease-in-out;
        transition-duration: 0ms;

        >>>.atom-carousel-item {
            position: relative;
            width: 100%;
            height: 100%;
            flex-shrink: 0;
            transition-duration: 1000ms;
            transition-property: transform;
            transition-timing-function: ease-in-out;
        }
    }

    &__paging {
        position: absolute;
        bottom: 15px;
        left: 0;
        text-align: center;
        width: 100%;
        > .paging__button {
            display: inline-block;
            margin: 0 4px;
            height: 8px;
            width: 8px;
            border-radius: 8px;
            background: rgba($dark, 0.6);
            transition: all $duration;
            &--active {
                width: 16px;
                /* transform: scale(1.2); */
                background: rgba($base, 0.7);
            }
        }
    }

    &__overlay {
        position: absolute;
        z-index: 1986;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
}
</style>
