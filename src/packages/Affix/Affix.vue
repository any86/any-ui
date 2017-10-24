<template>
    <!-- 明天控制下外层的height, 应该能解决bottom的问题. -->
    <div :style="{height: `${height}px`}" v-on="$listeners" class="atom-affix">
        <div :class="{'fixed': isFixed}" :style="{top: `${top}px`}">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import {
    getHeight,
    getScrollTop,
    getIsInView,
    getScrollParent
} from '@/utils/dom';
export default {
    name: 'Affix',

    props: {
        offsetTop: {
            type: Number,
            default: 0
        },

        events: {
            type: Array,
            default() {
                return [
                    'scroll',
                    'wheel',
                    'mousewheel',
                    'resize',
                    'animationend',
                    'transitionend',
                    'webkitAnimationend',
                    'webkitTransitionend',
                    'touchmove'
                ];
            }
        }
    },

    data() {
        return {
            isFixed: false,
            height: 'auto',
            width: 'auto',
            scrollParentNode: null
        };
    },

    mounted() {
        // 固定占位容器的高度为内容高度
        // 防止内容定位变成fixed时抖动
        this.height = this.$el.offsetHeight;
        this.scrollParentNode = getScrollParent(this.$el);
        this.events.forEach(eventName => {
            this.scrollParentNode.addEventListener(eventName, this.getIsFixed);
        });

        window.addEventListener('resize', this.getIsFixed);

        this.getIsFixed();
    },

    methods: {
        getIsFixed() {
            const { top } = this.$el.getBoundingClientRect();
            this.isFixed = this.offsetTop >= top;
            this.$emit('change', this.isFixed);
        }
    },

    computed: {
        top() {
            // 减去2是为了有个动画, 让进入不突兀
            return this.isFixed ? this.offsetTop : this.offsetTop - 2;
        }
    },

    destroyed() {
        this.events.forEach(eventName => {
            this.scrollParentNode.removeEventListener(
                eventName,
                this.getIsFixed
            );
        });
        window.removeEventListener('resize', this.getIsFixed);
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-affix {
    position: relative;
    width: 100%;
    > .fixed {
        transition: all 200ms;
        background: $background;
        position: fixed;
        left: 0;
        z-index: $affixZIndex;
        width: 100%;
    }
}
</style>
