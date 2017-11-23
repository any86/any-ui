<template>
    <!-- 明天控制下外层的height, 应该能解决bottom的问题. -->
    <div :style="{height: 0 < warpHeight && isFixed ? `${warpHeight}px` : 'auto'}" v-on="$listeners" class="atom-affix">
        <div :class="{'atom-affix__body--fixed': isFixed}" :style="style" class="atom-affix__body">
            <slot></slot>
        </div>
    </div>
</template>
<script>
// 待解决: 加入sticky
import { getHeight, getScrollTop, getIsInView, getScrollParent } from '@/utils/dom';
export default {
    name: 'Affix',

    props: {
        offsetTop: {
            type: Number,
            default: 0
        },

        offsetBottom: {
            type: Number
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

        if (undefined === this.offsetBottom && 0 <= this.offsetTop) {
            // 返回精准到小数的高度
            this.warpHeight = this.$el.getBoundingClientRect().height;
            this.getIsFixed();
        }
        this.scrollParentNode = getScrollParent(this.$el);
        this.events.forEach(eventName => {
            this.scrollParentNode.addEventListener(eventName, this.getIsFixed);
        });

        window.addEventListener('resize', this.getIsFixed);
    },

    methods: {
        getIsFixed() {
            if (undefined === this.offsetBottom) {
                const { top } = this.$el.getBoundingClientRect();
                this.isFixed = this.offsetTop >= top;
            } else {
                const { bottom } = this.$el.getBoundingClientRect();
                const winHeight = getHeight();
                this.isFixed = winHeight >= bottom + this.offsetBottom;
            }
        }
    },

    computed: {
        style() {
            if (undefined === this.offsetBottom) {
                // 减去2是为了有个动画, 让进入不突兀
                return {
                    // top: `${this.isFixed ? this.offsetTop : this.offsetTop - 2}px`
                    top: `${this.offsetTop}px`
                    
                };
            } else {
                return {
                    bottom: `${this.isFixed ? this.offsetBottom : this.offsetBottom - 2}px`
                };
            }
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
@import '../../scss/theme.scss';
.atom-affix {
    &__body--fixed {
        transition: all 200ms;
        position: fixed;
        left: 0;
        z-index: $affixZIndex;
        width: 100%;
    }
}
</style>
