<template>
    <section class="atom-swipe-out">
        <span class="atom-swipe-out__action-left">
            <slot name="left"></slot>
        </span>

        <span 
            ref="body"
            v-bind="$attrs"
            v-on="$listeners"
            :style="{transform: `translateX(${Math.round(activeX)}px)`, transitionDuration: `${duration}ms`}"
            @touchstart="touchStart" 
            @touchmove="touchMove" 
            @touchend="touchEnd" 
            class="atom-swipe-out__body">
            <slot></slot>
            <slot name="handle"></slot>
        </span>

        <span class="atom-swipe-out__action-right">
            <slot name="right"></slot>
        </span>
    </section>
</template>
<script>
import { getWidth, getHeight } from '@/utils/dom';
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
        },

        isStopPropagation: {
            type: Boolean,
            default: false
        },

        isPreventDefault: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            startPointX: 0,
            startX: 0,
            activeX: 0,
            duration: 0,
            minX:0,
            maxX:0,
        };
    },

    mounted() {
        // 放在计算属性中会因为初始化时机,
        // 而获取不到尺寸
        this.minX = this._getMinX();
        this.maxX = this._getMaxX();
    },

    methods: {
        touchStart(e) {
            if (this.isPreventDefault) e.preventDefault();
            if (this.isStopPropagation) e.stopPropagation();
            const point = e.touches[0];
            this.startPointX = point.pageX;
            this.startX = this.activeX;
            this.duration = 0;
        },

        touchMove(e) {
            if (this.isPreventDefault) e.preventDefault();
            if (this.isStopPropagation) e.stopPropagation();
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
            if (this.isPreventDefault) e.preventDefault();
            if (this.isStopPropagation) e.stopPropagation();
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
        },

        _getMinX() {
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

        _getMaxX(){
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
        isShowRight(isShowRight) {
            if (isShowRight) {
                this.duration = 300;
                this.activeX = this.minX;
            } else {
                this.duration = 300;
                this.activeX = 0;
            }
        }
    }
};
</script>