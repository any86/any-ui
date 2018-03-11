<template>
    <!-- 明天控制下外层的height, 应该能解决bottom的问题. -->
    <section :style="{height: 0 < warpHeight && isFixed ? `${warpHeight}px` : 'auto'}" v-on="$listeners" class="atom-affix">
        <div :class="{'atom-affix__body--fixed': isFixed}" :style="style" class="atom-affix__body">
            <slot></slot>
        </div>
    </section>
</template>
<script>
/**
 * 没有用sticky的原因, 有如下局限性:
 * 1. 父元素不能overflow:hidden或者overflow:auto属性。
 * 2. 必须指定top、bottom、left、right4个值之一，否则只会处于相对定位
 * 3. 父元素的高度不能低于sticky元素的高度
 * 4. sticky元素仅在其父元素内生效
 * 主要是因为第4条
 */
import { getHeight, getScrollTop, getIsInView, getScrollParent } from '../../utils/dom';
export default {
    name: 'AtomAffix',

    props: {
        offsetTop: {
            type: Number,
            default: 0
        },

        events: {
            type: Array,
            default() {
                return ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'webkitAnimationend', 'webkitTransitionend', 'touchmove'];
            }
        }
    },

    data() {
        return {
            isFixed: false,
            warpHeight: 0,
            scrollParentNode: null
        };
    },

    mounted() {
        // 固定占位容器的高度为内容高度
        // 防止内容定位变成fixed时抖动

        // 返回精准到小数的高度
        this.warpHeight = this.$el.getBoundingClientRect().height;
        this.getIsFixed();
        this.scrollParentNode = getScrollParent(this.$el);
        this.events.forEach(eventName => {
            this.scrollParentNode.addEventListener(eventName, this.getIsFixed);
        });

        window.addEventListener('resize', this.getIsFixed);
    },

    methods: {
        getIsFixed() {
            const { top } = this.$el.getBoundingClientRect();
            this.isFixed = this.offsetTop >= top;
        }
    },

    computed: {
        style() {
            return {
                top: `${this.offsetTop}px`
            };
        }
    },

    watch: {
        isFixed(value) {
            this.$emit('change', value);
        }
    },

    destroyed() {
        this.events.forEach(eventName => {
            this.scrollParentNode.removeEventListener(eventName, this.getIsFixed);
        });
        window.removeEventListener('resize', this.getIsFixed);
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-affix {
    &__body--fixed {
        // transition: all 200ms;
        position: fixed;
        left: 0;
        z-index: $affixZIndex;
        width: 100%;
    }
}
</style>
