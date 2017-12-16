<template>
    <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" class="atom-carousel">
        <div ref="body" :style="{transform: `translate3d(${translateX}px, 0, 0)`, transitionDuration: `${transitionDuration}ms`}" @transitionEnd="transitionEnd" @webkitTransitionEnd="transitionEnd" class="atom-carousel__body">
            <slot></slot>
        </div>
        <div class="atom-carousel__paging">
            <span v-for="n in count" :key="n" :class="{'paging__button--active': n - 1 === realIndex}" class="paging__button"></span>
        </div>
        <h1>activeIndex: {{activeIndex}}</h1>
        <h1>realIndex: {{realIndex}}</h1>
        <h1>translateX: {{translateX}}</h1>
        <h1>transitionDuration: {{transitionDuration}}</h1>

    </div>
</template>

<script>
import { getWidth, getTime } from '@/utils/dom';
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

        delay: {
            type: [Number, String],
            default: -1
        },

        disableOnInteraction: {
            type: Boolean,
            default: false
        },

        stopOnLast: {
            type: Boolean,
            default: false
        },

        speed: {
            type: Number,
            default: 300
        },

        loadPrevNext: {
            type: Boolean,
            default: true
        },

        loadPrevNextAmount: {
            type: Number,
            default: 1
        }
    },

    data: () => ({
        count: 0,
        warpWidth: 0,
        isAnimating: false,
        startPointX: 0,
        transitionDuration: 0,
        translateX: 0,
        startTranslateX: 0,
        afterSliderTransitonend: () => {},
        timer: null,
        imageStore: [],
        momentum: 0,
        startTime: 0
    }),

    mounted() {
        this.warpWidth = getWidth(this.$el);
        if (this.isLoop) {
            this.cloneNodeForLoop();
        }

        // 需要在cloneNodeForLoop后面执行
        this.imageToStore();
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
        imageToStore() {
            // 遍历所有lazy-src
            // 不能用$children, 因为还要传递el. $children没法区分fake/real
            this.$el.querySelectorAll('.atom-carousel-item').forEach(($item, index) => {
                this.imageStore[index] = [];
                $item.querySelectorAll('img').forEach($imgEl => {
                    $imgEl.setAttribute('lazy-status', 'ready');
                    this.imageStore[index].push({
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
            const pageImgStore = this.imageStore[activeIndex + (this.isLoop ? 1 : 0)];
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
            if (-1 < this.delay) {
                // 正向播放
                this.timer = setInterval(() => {
                    // 翻页
                    let activeIndex = this.activeIndex;
                    activeIndex++;
                    if (this.count <= activeIndex) {
                        activeIndex = 0;
                    }
                    this.slideTo(activeIndex, this.speed);
                }, this.delay);
            }
        },

        /**
         * 自动播放(true === isLoop)
         */
        playLoopSlider() {
            if (-1 < this.delay) {
                this.timer = setInterval(() => {
                    // 累加页码
                    let activeIndex = this.activeIndex;
                    activeIndex++;

                    if (this.count + 1 === activeIndex) {
                        // 从尾部的fake页 => 0
                        this.slideTo(0, 0);
                        this.$nextTick(() => {
                            this.slideTo(1);
                        });
                    } else if (this.count === activeIndex) {
                        // 从最后一页=> 尾部的fake页;
                        this.slideTo(activeIndex, this.speed, activeIndex => {
                            this.slideTo(0, 0);
                        });
                    } else if (-1 === activeIndex) {
                        this.slideTo(activeIndex, this.speed, activeIndex => {
                            this.slideTo(this.count - 1, 0);
                        });
                    } else {
                        this.slideTo(activeIndex, this.speed);
                    }
                }, this.delay);
            }
        },

        /**
         * 停止播放
         */
        stopSlider() {
            clearInterval(this.timer);
        },

        /** 
        * 恢复播放 
        */
        resumeSlider() {
            if (!this.disableOnInteraction) {
                if (this.isLoop) {
                    this.playLoopSlider();
                } else {
                    this.playSlider();
                }
            }
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
            this.startPointY = point.pageY;
            this.startTranslateX = this.translateX;
            this.transitionDuration = 0;
            this.startTime = getTime();
            this.$emit('touchstart');
        },

        /**
         * 计算滑动距离等逻辑
         */
        touchMove(e) {
            e.stopPropagation();
            this.stopSlider();
            const point = e.touches ? e.touches[0] : e;
            const deltaX = point.pageX - this.startPointX;
            const absDeltaX = Math.abs(deltaX);
            const deltaY = point.pageY - this.startPointY;
            const absDeltaY = Math.abs(deltaY);

            // X轴拖拽多才可以
            if (absDeltaX < absDeltaY + 15) return;

            // 重置缓冲量, touchend中累加
            this.momentum = 0;

            // 重置开始时间
            const now = getTime();
            if (300 < now - this.startTime) {
                this.startTime = now;
            }

            // 拖拽正在移动的item
            if (this.isAnimating) {
                this.startTranslateX = this.getTranslateX();
                this.translateX = this.startTranslateX;
                this.isAnimating = false;
            }

            // 超过阈值, 才可以滑动
            if (this.threshold < absDeltaX) {
                this.translateX = this.startTranslateX + deltaX - Math.sign(deltaX) * this.threshold;
            }

            // 边界逻辑, fake/real切换
            if (this.isLoop) {
                // 必须要<=, 因为拖拽的太快时, 会超过边界index
                if (this.minTranslateX > this.translateX) {
                    this.slideTo(0, 0);
                } else if (this.maxTranslateX < this.translateX) {
                    this.slideTo(this.lastIndex, 0);
                }
            }
            this.$emit('touchmove');
        },

        /**
         * 自动捏合等逻辑
         */
        touchEnd(e) {
            // 自动翻页
            const point = e.changedTouches ? e.changedTouches[0] : e;
            const deltaX = point.pageX - this.startPointX;
            const absDeltaX = Math.abs(deltaX);
            this.momentum = deltaX / (getTime() - this.startTime);
            this.slideTo(this.activeIndex);
            // 恢复播放
            this.resumeSlider();
            this.$emit('touchend');
        },
        /**
         * 滑动到指定activeIndex
         * @argument {Int} activeIndex
         * @argument {Number} duration 速度
         * @argument {Function} callback 滑动动画结束后触发
         * */
        slideTo(index, duration = this.speed, callback = () => {}) {
            this.isAnimating = 0 < duration && true;
            // 防止拖拽快的时候, duration = 0 被其他值覆盖
            // 覆盖原因, 暂未查明
            if (0 == duration) {
                this.$nextTick(() => {
                    this.transitionDuration = 0;
                });
            } else {
                this.transitionDuration = duration;
            }
            this.translateX = ((this.isLoop ? -1 : 0) - index) * this.stepWidth;
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

    computed: {
        maxTranslateX() {
            return 0;
        },

        minTranslateX() {
            return 0 - (this.count - (this.isLoop ? -1 : 1)) * this.warpWidth;
        },

        stepWidth() {
            return this.warpWidth / this.slidesPerView;
        },

        lastIndex() {
            return this.count - 1;
        },
        /**
         * 只要冲量大, 那么就切换页
         */
        activeIndex() {
            // 对于快速拖拽可以认为是要翻页, 所以给与translateX一个增量
            if (0.5 < Math.abs(this.momentum)) {
                if (0 < Math.sign(this.momentum)) {
                    return 0 - Math.ceil(this.translateX / this.stepWidth) - (this.isLoop ? 1 : 0);
                } else {
                    return 0 - Math.floor(this.translateX / this.stepWidth) - (this.isLoop ? 1 : 0);
                }
            } else {
                return 0 - Math.round(this.translateX / this.stepWidth) - (this.isLoop ? 1 : 0);
            }
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
    },

    watch: {
        value(value) {
            // 停止自动播放
            this.stopSlider();
            // 重新计时, 播放(防止切换后, 没有delay就播放了)
            this.resumeSlider();

            // 到达尾部停止自动播放
            if (this.stopOnLast && this.lastIndex === this.realIndex) {
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
         * 触发lazyload
         * 此处的watch的realIndex在初始化就执行了(但是this.$emit('input')没有触发), 可能是由于active在初始化后变了, 后续测试
         */
        realIndex(realIndex) {
            // 加载当前图片
            this.loadImageByActiveIndex(realIndex);

            // 预加载next/prev的图片
            if (this.loadPrevNext && 0 < this.loadPrevNextAmount) {
                this.loadImageByActiveIndex(realIndex - this.loadPrevNextAmount);
                this.loadImageByActiveIndex(realIndex + this.loadPrevNextAmount);
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
        will-change: transform;
        transition-property: transform;
        transition-timing-function: ease-in-out;
        transition-duration: 0ms;
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
            transition: transform $duration;
            &--active {
                transform: scale(1.2);
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
