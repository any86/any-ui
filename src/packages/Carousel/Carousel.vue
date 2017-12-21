<template>
    <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" class="atom-carousel">
        <div ref="body" :style="{transform: `translate3d(${translateX}px, 0, 0)`, transitionDuration: `${transitionDuration}ms`}" @transitionEnd="transitionEnd" @webkitTransitionEnd="transitionEnd" class="atom-carousel__body">
            <slot></slot>
        </div>
        <div v-if="hasPageBtn && 0 < pageBtnCount" class="atom-carousel__paging">
            <span v-for="n in pageBtnCount" :key="n" :class="{'paging__button--active': n - 1 === realIndex}" class="paging__button"></span>
        </div>
    </div>
</template>

<script>
import { getWidth, getTime } from '@/utils/dom';
/**
 * 1. 图片懒加载通过对img标签上的src-lazy设置图片地址, 
 *    如果一页有多个src-lazy会当第一个src-lazy加载完毕, 
 *    隐藏等待指示器, 不建议一页多个图, 不要权衡哪一个先限制.
 *    当然也可以通过lazy-weight来排序权重, 但是感觉现实开发中就应该避免一页多图的设计,
 *    如日后遇见此类需求再加,暂且开发到这
 * 2. 改变tranlateX来驱动activeIndex变化, 其他变化都是根据activeIndex变化
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
        // 不支持'auto'
        slidesPerView: {
            type: [Number, String],
            default: 1
        },

        hasPageBtn: {
            type: Boolean,
            default: true
        },

        isAutoPlay: {
            type: Boolean,
            default: true
        },

        isLoop: {
            type: Boolean,
            default: true
        },

        threshold: {
            type: Number,
            default: 15
        },

        delay: {
            type: [Number, String],
            default: 3000
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
        realCount: 0,
        count: 0,
        warpWidth: 0,
        isAnimating: false,
        startPointX: 0,
        transitionDuration: 0,
        translateX: 0,
        startTranslateX: 0,
        afterSliderTransitonend: () => {},
        playTimeOutId: null,
        imageStore: [],
        momentum: 0,
        startTime: 0,
        fakeCountOneSide: 0, // 每一侧fake的数量
        itemInViewCount: 0, // 每屏显示多少个item
        deltaX: 0
    }),

    mounted() {
        this.warpWidth = getWidth(this.$el);
        this.realCount = this.$children.length;
        this.itemInViewCount = Math.ceil(this.slidesPerView);
        this.fakeCountOneSide = this.isLoop ? this.itemInViewCount : 0;
        if (this.isLoop) {
            this.$nextTick(() => {
                this.cloneNodeForLoop();
                // 需要在cloneNodeForLoop后面执行
                this.$nextTick(() => {
                    // 针对slidesPerView > 1的请款重新算总页数
                    // 注意min/maxTranlateX的计算
                    // this.count = this.count + 1 - Math.floor(this.slidesPerView);
                    // 存储图片和activeIndex的映射关系
                    this.imageToStore();
                });
            });
        } else {
            this.imageToStore();
        }

        this.slideTo(this.value, 0);
        // 启动轮播, 此处不启动, 没法触发translateEnd
        this.playSlider();

        this.$nextTick(() => {
            this.$emit('init', { pageBtnCount: this.pageBtnCount });
        });

        // this.$refs.body.addEventListener('transitionend', ()=>{
        //     alert(321)
        // })
        // this.$refs.body.transitionend()
    },

    methods: {
        /**
         * 构造loop所需dom结构
         */
        cloneNodeForLoop() {
            this.$nextTick(() => {
                const itemWidth = `${this.warpWidth / this.slidesPerView}px`;
                // 对一屏幕多个item的情况进行生成多个fake
                const itemCount = this.$children.length;
                const fakeCount = this.fakeCountOneSide;
                for (let i = 0; i < fakeCount; i++) {
                    // 向尾部插入
                    let lastFakeNode = this.$children[i].$el.cloneNode(true);
                    lastFakeNode.style.width = itemWidth;
                    this.$refs.body.appendChild(lastFakeNode);

                    // 向头部插入
                    let headFakeNode = this.$children[
                        itemCount - 1 - i
                    ].$el.cloneNode(true);
                    headFakeNode.style.width = itemWidth;
                    this.$refs.body.insertBefore(
                        headFakeNode,
                        this.$refs.body.firstChild
                    );
                }
            });
        },

        /**
         * 存储所有lazy-src的图片地址, 还包括所在img元素/status
         */
        imageToStore() {
            // 遍历所有lazy-src
            // 不能用$children, 因为还要传递el. $children没法区分fake/real
            this.$el
                .querySelectorAll('.atom-carousel-item')
                .forEach(($item, index) => {
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

        async loadImageByActiveIndex(activeIndex) {
            await this.$nextTick();
            // 每页的图片
            const eachImageStore = this.imageStore[
                activeIndex + this.fakeCountOneSide
            ];
            // 判断active是否有效
            if (undefined !== eachImageStore) {
                eachImageStore.forEach(item => {
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
        playNoLoopSlider() {
            clearTimeout(this.playTimeOutId);
            this.playTimeOutId = setTimeout(() => {
                const nextIndex = this.activeIndex + 1;
                if (this.pageBtnCount <= nextIndex) {
                    this.slideTo(0);
                } else {
                    this.slideTo(nextIndex);
                }
            }, this.delay);
        },

        /**
         * 自动播放(true === isLoop)
         */
        playLoopSlider() {
            clearTimeout(this.playTimeOutId);
            this.playTimeOutId = setTimeout(() => {
                if (this.pageBtnCount <= this.activeIndex) {
                    this.slideTo(0, 0, () => {
                        this.slideTo(1);
                    });
                } else {
                    this.slideTo(this.activeIndex + 1);
                }
            }, this.delay);
        },

        /**
         * 停止播放
         */
        stopSlider() {
            clearTimeout(this.playTimeOutId);
        },

        /** 
        * 恢复播放
        */
        playSlider() {
            if (this.isAutoPlay && !this.disableOnInteraction) {
                if (this.isLoop) {
                    this.playLoopSlider();
                } else {
                    this.playNoLoopSlider();
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
            log(matrix);
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
            const deltaY = point.pageY - this.startPointY;
            const absDeltaX = Math.abs(deltaX);
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

            // 超过阈值, 才可以滑动
            if (this.threshold < absDeltaX) {
                // 对于超过边界的减速滑动
                const translateX =
                    this.startTranslateX +
                    deltaX -
                    Math.sign(deltaX) * this.threshold;
                if (this.minTranslateX >= this.translateX) {
                    this.translateX =
                        this.minTranslateX +
                        (translateX - this.minTranslateX) * 0.2;
                } else if (this.maxTranslateX <= this.translateX) {
                    this.translateX =
                        this.maxTranslateX +
                        (translateX - this.maxTranslateX) * 0.2;
                } else {
                    this.translateX = translateX;
                }
            }

            // 边界逻辑, fake/real切换
            if (this.isLoop) {
                // 必须要<=, 因为拖拽的太快时, 会超过边界index
                // 限制只能是在fake页面上拖拽才可以触发位置交换
                if (
                    this.minTranslateX >= this.translateX &&
                    this.minTranslateX >= this.startTranslateX
                ) {
                    this.slideTo(0, 0);
                } else if (
                    this.maxTranslateX <= this.translateX &&
                    this.maxTranslateX <= this.startTranslateX
                ) {
                    this.slideTo(this.realCount - this.fakeCountOneSide, 0);
                }
            }

            // 拖拽正在移动的item
            if (this.isAnimating) {
                this.startTranslateX = this.getTranslateX();
                this.translateX = this.startTranslateX;
                this.isAnimating = false;
            }
            this.startTranslateX = this.getTranslateX();

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
            this.$emit('touchend');
        },
        /**
         * 滑动到指定activeIndex
         * @argument {Int} activeIndex
         * @argument {Number} duration 速度
         * @argument {Function} callback 滑动动画结束后触发
         * */
        slideTo(activeIndex, duration = this.speed, callback = () => {}) {
            this.isAnimating = 0 < duration;
            this.transitionDuration = duration;
            let translateX =
                0 - (activeIndex + this.fakeCountOneSide) * this.stepWidth;
            // 主要是针对sliderPerView造成的边界不对齐而做的自动对齐
            if (this.minTranslateX > translateX) {
                translateX = this.minTranslateX;
            } else if (this.maxTranslateX < translateX) {
                translateX = this.maxTranslateX;
            }
            this.translateX = translateX;
            this.startTranslateX = this.translateX;
            this.afterSliderTransitonend = callback;
            if (0 === duration) {
                setTimeout(() => {
                    callback();
                }, 199);
            }
        },

        /**
         * 动画结束后, 复位状态/触发回调
         */
        transitionEnd() {
            this.isAnimating = false;
            this.transitionDuration = 0;
            this.afterSliderTransitonend(this.activeIndex);
            // 自动播放下一张
            this.playSlider();

            this.$emit('input', this.activeIndex);
        }
    },

    computed: {
        pageBtnCount() {
            if (this.isLoop) {
                return this.realCount;
            } else {
                return (
                    Math.ceil(
                        (this.realCount * this.stepWidth - this.warpWidth) /
                            this.stepWidth
                    ) + 1
                );
            }
        },

        maxTranslateX() {
            return 0;
        },

        minTranslateX() {
            return (
                (this.isLoop ? 0 : 1) * this.warpWidth -
                (this.realCount + this.fakeCountOneSide) * this.stepWidth
            );
        },

        stepWidth() {
            return this.warpWidth / this.slidesPerView;
        },

        lastIndex() {
            return this.realCount - 1;
        },
        /**
         * 只要冲量大, 那么就切换页
         */
        activeIndex() {
            let activeIndex;
            // 对于快速拖拽可以认为是要翻页, 所以给与translateX一个增量
            if (0.5 < Math.abs(this.momentum)) {
                if (0 < Math.sign(this.momentum)) {
                    activeIndex =
                        0 -
                        Math.ceil(this.translateX / this.stepWidth) -
                        this.fakeCountOneSide;
                } else {
                    activeIndex =
                        0 -
                        Math.floor(this.translateX / this.stepWidth) -
                        this.fakeCountOneSide;
                }
            } else {
                // 如果sliderPerView > 1, 产生了每一页不对齐
                // 那么当通过外部控制value到达了最后一页时, 不进行round, 防止回退到前一页, 而是ceil直接跳到尾页
                // 拖拽的翻页不会发生如此情况, 因为拖拽产生的translateX的值会超过尾页所需translatex, 所以会触发round
                if (this.minTranslateX >= this.translateX) {
                    activeIndex =
                        Math.ceil((0 - this.translateX) / this.stepWidth) -
                        this.fakeCountOneSide;
                } else {
                    activeIndex =
                        Math.round((0 - this.translateX) / this.stepWidth) -
                        this.fakeCountOneSide;
                }
            }

            if (this.realCount + this.fakeCountOneSide <= activeIndex) {
                activeIndex = this.realCount + this.fakeCountOneSide - 1;
            } else if (0 - this.fakeCountOneSide > activeIndex) {
                activeIndex = 0 - this.fakeCountOneSide;
            }
            return activeIndex;
        },

        realIndex() {
            let realIndex = this.activeIndex;
            if (this.count <= this.activeIndex) {
                realIndex = 0;
            } else if (-1 >= this.activeIndex) {
                realIndex = this.count + this.activeIndex;
            }
            return realIndex;
        }
    },

    watch: {
        value(value) {
            this.slideTo(value);
        },

        activeIndex(activeIndex) {
            this.$emit('update:realIndex', this.realIndex);
            this.$emit('change', {
                realIndex: this.realIndex,
                activeIndex: this.activeIndex
            });
        },
        /**
         * 触发lazyload
         * 此处的watch的realIndex在初始化就执行了(但是this.$emit('input')没有触发), 可能是由于active在初始化后变了, 后续测试
         */
        async realIndex(realIndex) {
            // 等待this.imageStore填充完毕
            await this.$nextTick();
            // 加载当前图片
            // this.itemInViewCount, 这里针对isLoop = false的情况, 因为fakeCountOneSide = 0 ,  所以不能直接使用
            for (let i = 0; i < this.itemInViewCount; i++) {
                let activeIndex = realIndex + i;
                this.loadImageByActiveIndex(activeIndex);
            }

            // 预加载next/prev的图片
            if (this.loadPrevNext && 0 < this.loadPrevNextAmount) {
                for (let i = 1; i <= this.loadPrevNextAmount; i++) {
                    this.loadImageByActiveIndex(realIndex - i);
                    this.loadImageByActiveIndex(realIndex + i);
                }
            }

            // 针对边界对fake的图片也同时加载
            if (this.isLoop) {
                if (0 === realIndex) {
                    for (let i = 0; i < this.fakeCountOneSide; i++) {
                        this.loadImageByActiveIndex(this.realCount + i);
                    }
                } else if (this.lastIndex === realIndex) {
                    for (let i = 1; i <= this.fakeCountOneSide; i++) {
                        this.loadImageByActiveIndex(0 - i);
                    }
                }
            }
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
        z-index: 10;
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
                transform: scale(1.4);
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
