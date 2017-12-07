<template>
    <main>
        <!-- X轴滚动 -->
        <section class="border-bottom gutter ovh">
            <h4 class="border-bottom fill-bottom">X轴滚动</h4>
            <v-cell>
                <v-input v-model="pos1.scrollLeft"></v-input>
            </v-cell>
            <virtual-scroller v-model="pos1" :is-lock-x="false" :is-lock-y="true" class="gutter-top">
                <div class="flex">
                    <div v-for="n in 20" :key="n" class="column fill flex-item">第{{n}}列</div>
                </div>

            </virtual-scroller>
        </section>

        <!-- Y轴滚动 -->
        <section style="height:300px;" class="gutter ">
            <h4 class="border-bottom fill-bottom">Y轴滚动</h4>
            <v-cell>
                <v-input v-model="pos2.scrollTop"></v-input>
            </v-cell>
            <virtual-scroller v-model="pos2" class="border-bottom">
                <div v-for="n in 70" :key="n" class="cell fill">第{{n}}行信息
                </div>
            </virtual-scroller>
        </section>
    </main>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VInput from '@/packages/Input/Input';
import VCount from '@/packages/Count/Count';
import VView from '@/packages/View/View';
import VirtualScroller from '@/packages/VirtualScroller/VirtualScroller';
export default {
    name: 'ScrollViewDemo',

    data() {
        return {
            pos1: {
                scrollTop: 0,
                scrollLeft: 0
            },

            pos2: {
                scrollTop: 0,
                scrollLeft: 0
            }
        };
    },

    methods: {},

    components: {
        VCell,
        VInput,
        VCount,
        VView,
        VirtualScroller
    }
};
</script>
<style scoped lang="scss">
.column {
    word-break: keep-all;
    align-self: center;
    height: 60px;
}

.column:nth-child(2n + 1) {
    background: #eee;
}
.column:nth-child(2n) {
    background: #ddd;
}

.cell:nth-child(2n) {
    background: #ddd;
}

.cell:nth-child(2n + 1) {
    background: #eee;
}
</style>
