<template>
    <section class="atom-swipe-out">
        <span class="atom-swipe-out__action-left">
            <slot name="left"></slot>
        </span>

        <span 
            ref="body"
            v-bind="$attrs"
            v-on="$listeners"
            :style="{transform: `translateX(${activeX}px)`, transitionDuration: `${duration}ms`}"
            @touchstart="touchStart" 
            @touchmove="touchMove" 
            @touchend="touchEnd" 
            class="atom-swipe-out__body">
            <slot></slot>
        </span>
        <span class="atom-swipe-out__action-right">
            <slot name="right"></slot>
        </span>
    </section>
</template>
<script>
import { getWidth, getHeight } from '../../utils/dom';
export default {
    name: 'AtomSwipeOut',

    props: {
        isShowLeft: {
            type: Boolean,
            default: false
        },

        isShowRight: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            startPointX: 0,
            startX: 0,
            activeX: 0,
            duration: 0
        };
    },

    methods: {
        touchStart(e) {
            e.preventDefault();
            e.stopPropagation();
            const point = e.touches[0];
            this.startPointX = point.pageX;
            this.startX = this.activeX;
            this.duration = 0;
        },

        touchMove(e) {
            e.preventDefault();
            e.stopPropagation();
            const point = e.touches[0];
            const deltaX = point.pageX - this.startPointX;
            this.activeX = this.startX + deltaX;

            // 范围限制
            this.activeX = Math.max(this.activeX, this.minX);
            this.activeX = Math.min(this.activeX, this.maxX);
        },

        /**
         * 复位操作
         */
        touchEnd(e) {
            e.preventDefault();
            e.stopPropagation();
            this.duration = 300;
            if (0 > this.activeX) {
                if (this.minX / 2 > this.activeX) {
                    this.activeX = this.minX;
                    this.$emit('update:isShowRight', true);
                    this.$emit('open', 'right');
                } else {
                    this.activeX = 0;
                    
                }
            } else {
                if (this.maxX / 2 < this.activeX) {
                    this.activeX = this.maxX;
                    this.$emit('update:isShowLeft', true);
                    this.$emit('open', 'left');
                } else {
                    this.activeX = 0;
                }
            }
        }
    },

    computed: {
        minX() {
            if (undefined === this.$slots.right) return 0;
            let minX = 0;
            this.$slots.right.forEach(item => {
                let itemWidth = getWidth(item.elm);
                if (undefined !== itemWidth) {
                    minX -= itemWidth;
                }
            });
            return minX;
        },

        maxX() {
            if (undefined === this.$slots.left) return 0;
            let maxX = 0;
            this.$slots.left.forEach(item => {
                let itemWidth = getWidth(item.elm);
                if (undefined !== itemWidth) {
                    maxX += itemWidth;
                }
            });
            return maxX;
        }
    },

    watch: {
        isShowRight(isShowRight){
            this.activeX = isShowRight ? this.minX : 0;
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-swipe-out {
    position: relative;
    display: flex;
    align-items: center;
    &__body {
        position: relative;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 100%;
        min-height: 44px;
        border-bottom: 1px solid $lightest;
    }

    &__action-left {
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        transform: translateX(-100%);
        display: flex;
    }

    &__action-right {
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(100%);
        display: flex;
    }
}
</style>
