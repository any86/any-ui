<template>
    <div class="atom-tabs" @click.stop="showHidden($event)">
        <v-scroller v-model="tabPos" :is-lock-x="false" :is-lock-y="true" :body-class="{flex: true}">
            <slot></slot>
            <!-- 状态条 -->
            <div class="atom-tabs__state-bar">
                <div class="indicator" :style="{width: `${itemWidthList[activeIndex]}px`, transform: `translate3d(${indicatorTranslateX}px, 0, 0)`}"></div>
            </div>
        </v-scroller>
    </div>
</template>
<script>
import { getWidth } from '@/utils/dom'
import VScroller from '@/packages/Scroller/Scroller'
export default {
    name: 'Tabs',

    props: {
        value: {
            type: Number,
            default: 0
        },

        maxColumn: {
            type: Number,
            default: 4
        }
    },

    data() {
        return {
            warpWidth: 0,
            itemWidthList: [],
            lateItemWidth: 0,
            countWidth: 0,
            count: 0,
            activeIndex: 2,
            tabPos: { scrollLeft: 0, scrollTop: 0 },
            stateBarStyle: { position: 'absolute', bottom: 0 }
        }
    },

    mounted() {
        this.warpWidth = getWidth(this.$el);
        this.lateItemWidth = this.itemWidthList[this.count - 1];
    },

    methods: {
        /**
        * 通过控制滚动条, 显示边缘的隐藏项 
        * @argument {Event} 
        */
        showHidden(e) {
            const offsetLeft = e.target.offsetLeft;
            // const itemWidth = getWidth(e.target);
            const prevIndex = this.activeIndex - 1;
            if (1 <= prevIndex) {
                // 获取前一项的距离左边距的距离 == 前一项的前面项的width和
                let countWidth = this.countWidthByIndex(prevIndex - 1);
                // 判断前一项是否完全可见, 不能有部分被遮挡
                // 判断后一项是否完全可见 
                if (countWidth < this.tabPos.scrollLeft) {
                    this.tabPos.scrollLeft = countWidth;
                } else {
                    const nextIndex = this.activeIndex + 1;
                    // 是否有下一项
                    if (nextIndex < this.count) {
                        let countWidth = this.countWidthByIndex(nextIndex);
                        // 下一项是否被隐藏
                        if (countWidth > this.tabPos.scrollLeft + this.warpWidth) {
                            this.tabPos.scrollLeft = countWidth - this.warpWidth;
                        }
                    }
                }
            }
        },

        countWidthByIndex(index) {
            let countWidth = 0;
            if (0 < index) {
                for (var i in this.itemWidthList) {
                    countWidth += this.itemWidthList[i];
                    if (i == index) break;
                }
            }
            return countWidth;
        },
    },

    computed: {
        indicatorTranslateX() {
            let translateX = 0;
            for (var i in this.itemWidthList) {
                if (this.activeIndex == i) break;
                translateX += this.itemWidthList[i];
            };
            return translateX;
        }
    },

    components: { VScroller }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 1rem;
.atom-tabs {
    position: relative;
    background: $background;
    height: $height;
    width: 100%;
    border-bottom: 1px solid $lightest;
    &__state-bar {
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        .indicator {
            transition-duration: 300ms;
            transition-timing-function: ease-in-out;
            width: 0;
            height: 2px;
            text-align: center;
            background: $base;
        }
    }
}
</style>
