<script>
import { getHeight, getWidth } from '@/utils/dom';
import { cloneVNodes } from '@/utils/vnode';
import throttle from 'lodash/throttle';
import times from 'lodash/times';

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
        }
    },

    data: () => ({
        count: 0,
        indexCounter: 0,
        viewWidth: 0,
        activeIndex: 0,
        isAnimating: false,
        startPointX: 0,
        transitionDuration: 0,
        translateX: 0,
        startTranslateX: 0,
        hasPaging: true,
        fakeVNodes: null
    }),
    /*
    * render真的好乱, 稍后尝试下jsx.
    */
    render(h) {
        // 真的是没办法才用的%做单位, 不清楚为什么beforeMount中的代码(translateX)不会让render响应,
        // 且render中取$el如果用了$isServer判断执行顺序会被放后
        // 猜测可能是nuxt强制created阶段和beforeMount阶段渲染出来的html要一致

        // {element group} 分页按钮组合
        const pageButtons = Array.apply(null, {
            length: this.count
        }).map((item, index) => {
            return h('span', {
                class: {
                    'paging__button': true,
                    'paging__button--active': this.activeIndex == index || (this.activeIndex == this.count && 0 == index) || (-1 == this.activeIndex && this.count - 1 == index)
                }
            });
        });

        // {element} 分页条
        const paging = h('div', { class: ['atom-carousel__paging'] }, pageButtons);

        // {element} 覆盖层
        if (undefined !== this.$slots.overlay) {
            const overlay = h(
                'div',
                {
                    class: ['atom-carousel__overlay']
                },
                this.$slots.overlay
            );
        }

        // {element} 容器body
        const body = h(
            'div',
            {
                class: ['atom-carousel__body'],
                style: {
                    transform: `translateX(${this.translateX - this.offsetLeft}%)`,
                    transitionDuration: `${this.transitionDuration}ms`
                }
            },
            [this.fakeVNodes]
        );

        // 插入body的vnode
        return h(
            'div',
            {
                class: ['atom-carousel'],
                on: {
                    transitionend: this.transitionEnd,
                    webkittransitionEnd: this.transitionEnd,
                    touchstart: this.touchStart,
                    touchmove: this.touchMove,
                    touchend: this.touchEnd
                }
            },
            undefined === this.$slots.overlay ? [body, paging] : [body, paging, overlay]
        );
    },

    created() {
        this.fakeVNodes = this.buildFakeVNode();
        this.slideTo(this.value, 0);
    },

    beforeMount() {
        this.viewWidth = getWidth(this.$el);
    },

    methods: {
        buildFakeVNode() {
            // {filter} 过滤掉v-if产生的注释node
            let $slots = this.$slots.default.filter(item => {
                return undefined !== item.tag;
            });

            // {slot} 构造轮播item的伪头和伪尾
            this.count = $slots.length;
            const $cloneSlot = cloneVNodes($slots, true);
            let fakeTailArray = [];
            for (let i = this.count - this.slidesPerView; i < this.count; i++) {
                fakeTailArray.push($cloneSlot[i]);
            }

            let fakeHeaderArray = [];
            for (let i = 0; i < this.slidesPerView; i++) {
                fakeHeaderArray.push($cloneSlot[i]);
            }

            return [...fakeTailArray, ...$slots, ...fakeHeaderArray];
        },

        touchStart(e) {
            e.stopPropagation();
            e.preventDefault();
            const point = e.touches ? e.touches[0] : e;
            this.startPointX = point.pageX;
            this.startTranslateX = this.translateX;
            this.transitionDuration = 0;
        },

        touchMove(e) {
            e.stopPropagation();
            e.preventDefault();
            // 如果是fake的item, 那么切换到real的item
            
            if (this.count <= this.activeIndex) {
                // 正翻, 超过count代表已经到达尾部的fake
                this.slideTo(0, 0);
            } else if (0 > this.activeIndex) {
                // 回翻,
                this.slideTo(this.count - 1, 0);
            } else {
                const point = e.touches ? e.touches[0] : e;
                const deltaX = point.pageX - this.startPointX;
                const absDeltaX = Math.abs(deltaX);
                this.translateX = this.startTranslateX + Math.round(deltaX / this.viewWidth * 100);
            }
        },

        touchEnd(e) {
            const point = e.changedTouches ? e.changedTouches[0] : e;
            const deltaX = point.pageX - this.startPointX;
            const absDeltaX = Math.abs(deltaX);

            // next / prev
            const absTranslateX = Math.abs(this.translateX);
            if (0 > deltaX) {
                
                // next
                if (0.3 < absDeltaX / this.oneSliderTranslateX) {
                    this.activeIndex = Math.ceil((absTranslateX - 100) / this.oneSliderTranslateX);
                } else {
                    this.activeIndex = Math.floor((absTranslateX - 100) / this.oneSliderTranslateX);
                }
            } else {
                if (0.3 < absDeltaX / this.oneSliderTranslateX) {
                    this.activeIndex = Math.floor((absTranslateX - 100) / this.oneSliderTranslateX);
                } else {
                    this.activeIndex = Math.ceil((absTranslateX - 100) / this.oneSliderTranslateX);
                }
            }

            this.slideTo(this.activeIndex);
        },

        slideTo(index, duration = 300) {
            this.isAnimating = 0 < duration && true;
            this.transitionDuration = duration;
            this.activeIndex = index;
            this.translateX = 0 - 100 - index * this.oneSliderTranslateX;
            this.startTranslateX = this.translateX;
        },

        setTranslateX(percent, duration = 300) {
            this.isAnimating = 0 < duration && true;
            this.transitionDuration = duration;
            this.translateX = percent;
            this.startTranslateX = this.translateX;
        },

        transitionEnd() {
            this.isAnimating = false;
            this.transitionDuration = 0;
            // let activeIndex = this.activeIndex;
            // if (this.count == this.activeIndex) {
            //     activeIndex = 0;
            // } else if (-1 === this.activeIndex) {
            //     activeIndex = this.count - 1;
            // }
            // this.slideTo(activeIndex, 0);
            // this.$nextTick(() => {
            //     this.$emit('input', this.activeIndex);
            // });
            // this.$emit('transitionEnd', this.activeIndex);
        }
    },

    watch: {
        value(value) {
            if (this.count > value && -1 < value) {
                this.slideTo(value);
            }
        }
    },

    computed: {
        oneSliderTranslateX() {
            return 100 / this.slidesPerView;
        },

        offsetLeft() {
            return 0;
        }
    },

    components: {}
};
</script>
<style scoped lang=scss>
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
            /* transition: all $duration; */
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
