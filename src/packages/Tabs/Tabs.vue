<template>
    <div @click.stop="showHidden($event)" class="atom-tabs">
        <v-scroller v-model="tabPos" :is-lock-x="false" :is-lock-y="true" :body-class="{flex: true}" :is-disable-touch="isDisableTouch">
            <slot></slot>
            <!-- 状态条 -->
            <div class="atom-tabs__state-bar">
                <div class="indicator" :style="{width: `${itemWidthList[activeIndex]}px`, transform: `translate3d(${indicatorTranslateX}px, 0, 0)`}"></div>
            </div>
        </v-scroller>
    </div>
</template>
<script>
import { getWidth } from '@/utils/dom';
import VScroller from '@/packages/VirtualScroller/VirtualScroller';
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
        * 通过控制滚动条, 显示边缘的隐藏项 
        * @argument {Event} 
        */
        showHidden() {
            const prevIndex = this.activeIndex - 1;
            if (1 <= prevIndex) {
                // 获取前一项的距离左边距的距离 == 前一项的前面项的width和
                let countWidth = this.countRightWidthByIndex(prevIndex - 1);
                // 判断前一项是否完全可见, 不能有部分被遮挡
                // 判断后一项是否完全可见
                if (countWidth < this.tabPos.scrollLeft) {
                    this.tabPos.scrollLeft = countWidth;
                } else {
                    const nextIndex = this.activeIndex + 1;
                    // 是否有下一项
                    if (nextIndex < this.count) {
                        let countWidth = this.countRightWidthByIndex(nextIndex);
                        // 下一项是否被隐藏
                        if (
                            countWidth >
                            this.tabPos.scrollLeft + this.warpWidth
                        ) {
                            this.tabPos.scrollLeft =
                                countWidth - this.warpWidth;
                        }
                    }
                }
            }
        },

        countRightWidthByIndex(index) {
            let countWidth = 0;
            if (0 < index) {
                for (var i in this.itemWidthList) {
                    countWidth += this.itemWidthList[i];
                    if (i == index) break;
                }
            }
            return countWidth;
        }
    },

    computed: {
        indicatorTranslateX() {
            let translateX = 0;
            for (var i in this.itemWidthList) {
                if (this.activeIndex == i) break;
                translateX += this.itemWidthList[i];
            }
            return translateX;
        }
    },

    watch: {
        value(value){
            this.activeIndex = value;
            this.showHidden();
            this.$emit('input', value);
        }
    },

    components: { VScroller }
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
    &__state-bar {
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0;
        width: 100%;

        .indicator {
            transition-duration: 300ms;
            transition-timing-function: ease-in-out;
            width: 0;
            height: 2px;
            text-align: center;
            background: $primary;
        }
    }
}
</style>
