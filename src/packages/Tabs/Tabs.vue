<template>
    <div :class="{'atom-tabs--more-in-right': hasItemsInRight, 'atom-tabs--more-in-left': hasItemsInLeft}" class="atom-tabs">
        <!-- is-prevent-default一定要是false, 不然click事件会被过滤掉 -->
        <virtual-scroller v-model="tabPos" :is-prevent-default="false" :is-lock-x="false" :is-lock-y="true" :body-class="{flex: true}" :is-disable-touch="isDisableTouch">
            <slot></slot>
            <!-- 状态条 -->
            <div class="atom-tabs__state-bar">
                <div class="indicator" :style="{width: `${itemWidthList[activeIndex]}px`, transform: `translate3d(${indicatorTranslateX}px, 0, 0)`}"></div>
            </div>
        </virtual-scroller>
    </div>
</template>
<script>
import { getWidth } from '@/utils/dom';
import VirtualScroller from '@/packages/VirtualScroller/VirtualScroller';
export default {
    name: 'Tabs',

    props: {
        value: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            warpWidth: 0,
            itemWidthList: [],
            countWidth: 0,
            count: 0,
            activeIndex: 0,
            tabPos: { scrollLeft: 0, scrollTop: 0 },
            stateBarStyle: { position: 'absolute', bottom: 0 },
            isDisableTouch: true // 少量选项的时候关闭拖拽
        };
    },

    mounted() {
        this.activeIndex = this.value;
        this.warpWidth = getWidth(this.$el);
        this.isDisableTouch = this.countWidth <= this.warpWidth;
    },

    methods: {
        /**
         * 计算左边item的宽度总和
         * @augments {Number} 
         */
        countLeftItemWidth(index) {
            let countWidth = 0;
            for (let i = 0; i < index; i++) {
                countWidth += this.itemWidthList[i];
            }
            return countWidth;
        },

        /**
         * 计算右边item的宽度总和
         * @augments {Number} 
         */
        countRightItemWidth(index) {
            let countWidth = 0;
            for (let i = index + 1; i < index; i++) {
                countWidth += this.itemWidthList[i];
            }
            return countWidth;
        },

        /**
         * 当点击不完全显示的item时, 自动滑动以便显示完整
         */
        scrollIntoView() {
            // 让当前item居中显示
            if (this.isLeftHidden || this.isRightHidden) {
                this.tabPos.scrollLeft = this.indicatorTranslateX - this.warpWidth / 2 + this.itemWidthList[this.activeIndex] / 2;
            }

            // 边界处理
            if (0 > this.tabPos.scrollLeft) {
                this.tabPos.scrollLeft = 0;
            } else if (this.countWidth - this.warpWidth < this.tabPos.scrollLeft) {
                this.tabPos.scrollLeft = this.countWidth - this.warpWidth;
            }
        }
    },

    computed: {
        /**
         * 否右当前item右侧被遮挡
         */
        isRightHidden() {
            return this.warpWidth + this.tabPos.scrollLeft < this.indicatorTranslateX + this.itemWidthList[this.activeIndex];
        },

        /**
         * 否右当前item左侧被遮挡
         */
        isLeftHidden() {
            return this.tabPos.scrollLeft > this.indicatorTranslateX;
        },
        /**
         * 状态条scrollTop
         * 其实就是当前item左边的距离
         */
        indicatorTranslateX() {
            return this.countLeftItemWidth(this.activeIndex);
        },

        /**
         * 右侧有item被遮挡
         */
        hasItemsInRight() {
            return this.tabPos.scrollLeft + this.warpWidth < this.countWidth;
        },

        /**
         * 左侧有item被遮挡
         */
        hasItemsInLeft() {
            return 0 < this.tabPos.scrollLeft;
        }
    },

    watch: {
        value(index, oldIndex) {
            this.activeIndex = index;
            if (this.countWidth > this.warpWidth) {
                this.scrollIntoView();
            }
            this.$emit('input', index);
        }
    },

    components: { VirtualScroller }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 55px;
.atom-tabs {
    position: relative;
    background: $background;
    width: 100%;
    border-bottom: 1px solid $lightest;
    &--more-in-right {
        &:before {
            pointer-events: none;
            content: '';
            height: 100%;
            width: 50px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 3;
            background: linear-gradient(left, rgba(#fff, 1), rgba($primary, 0));
        }
    }
    &--more-in-left {
        &:after {
            pointer-events: none;
            content: '';
            height: 100%;
            width: 50px;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 3;
            background: linear-gradient(right, rgba(#fff, 1), rgba($primary, 0));
        }
    }

    &__state-bar {
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0;
        width: 100%;

        .indicator {
            transition-duration: $duration;
            transition-timing-function: ease-in-out;
            width: 0;
            height: 2px;
            text-align: center;
            background: $primary;
        }
    }
}
</style>
