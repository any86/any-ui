<template>
    <div class="atom-tabs">
        <v-scroller v-model="tabPos" :is-lock-x="false" :is-lock-y="true" :body-class="{flex: true}">
            <slot></slot>
        </v-scroller>
        <!-- 状态条 -->
        <v-scroller v-model="indicatorPos" :is-lock-x="false" :is-lock-y="true" class="atom-tabs__state-bar">
            <div class="indicator"></div>
        </v-scroller>
    </div>
</template>
<script>
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
            itemWidth: [],
            width: 0,
            tabPos: { scrollLeft: 0, scrollTop: 0 },
            indicatorPos: { scrollLeft: 0, scrollTop: 0 },
            stateBarStyle: { position: 'absolute', bottom: 0 }
        }
    },

    mounted() {

    },

    methods: {
        touchstart(e) {

        },

        touchmove(e) {

        },

        touchend(e) {

        }
    },

    computed: {

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
    border-bottom: 1px solid $lightest;
    height: $height;
    width: 100%;


    &__state-bar {
        .indicator {
            width: 100px;
            height: 2px;
            background: $base;
        }
    }
}
</style>
