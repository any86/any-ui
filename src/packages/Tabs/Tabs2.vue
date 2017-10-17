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
            itemWidthList: [],
            countWidth: 0,
            count: 0,
            activeIndex: 2,
            tabPos: { scrollLeft: 0, scrollTop: 0 },
            stateBarStyle: { position: 'absolute', bottom: 0 }
        }
    },

    mounted() {
    },

    methods: {
        showHidden(e) {
            this.tabPos.scrollLeft+= this.itemWidthList[this.activeIndex];
            if(this.countWidth - this.itemWidthList[0] < this.tabPos.scrollLeft) {
                // this.tabPos.scrollLeft = newScrollLeft;
            } else {
                this.tabPos.scrollLeft = this.tabPos.scrollLeft;
            }
        }
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
    padding-right: $gutter/2;
    padding-left: $gutter/2;
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
