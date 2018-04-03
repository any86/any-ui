<template>
    <div :class="{'atom-tabs--more-in-right': hasItemsInRight, 'atom-tabs--more-in-left': hasItemsInLeft}" class="atom-tabs">
        <!-- is-prevent-default一定要是false, 不然click事件会被过滤掉 -->
        <virtual-scroller 
            v-model="position" 
            :is-prevent-default="false" 
            :is-lock-x="false" 
            :is-lock-y="true" 
            :body-class="{flex: true}" 
            :is-disabled="isDisabled">
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
import VirtualScroller from '@/packages/VirtualScroller';
export default {
    name: 'AtomTabs',

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
            position: { x: 0, y: 0 },
            stateBarStyle: { position: 'absolute', bottom: 0 },
            isDisabled: true // 少量选项的时候关闭拖拽
        };
    },

    mounted() {
        this.activeIndex = this.value;
        this.warpWidth = getWidth(this.$el);
        this.isDisabled = this.countWidth <= this.warpWidth;
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
            this.position.x = this.indicatorTranslateX - this.warpWidth / 2 + this.itemWidthList[this.activeIndex] / 2;

            // 边界处理
            if (0 > this.position.x) {
                this.position.x = 0;
            } else if (this.countWidth - this.warpWidth < this.position.x) {
                this.position.x = this.countWidth - this.warpWidth;
            }
        }
    },

    computed: {
        /**
         * 状态条scrollTop
         * 其实就是当前item左边的距离
         */
        indicatorTranslateX() {
            return this.countLeftItemWidth(this.activeIndex);
        },

        /**
         * 用来给侧面加遮罩阴影
         * 右侧有item被遮挡
         */
        hasItemsInRight() {
            return this.position.x + this.warpWidth < this.countWidth;
        },

        /**
         * 左侧有item被遮挡
         */
        hasItemsInLeft() {
            return 0 < this.position.x;
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