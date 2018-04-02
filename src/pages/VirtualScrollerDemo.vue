<template>
    <v-scroll-view class="fill-bottom">
        <!-- X轴滚动 -->
        <section class="border-bottom gutter ovh">
            <h4 class="border-bottom fill-bottom">X轴滚动</h4>
                <v-input v-model="pos1.x"></v-input>
            <virtual-scroller v-model="pos1" :is-prevent-default="false" :is-lock-x="false" :is-lock-y="true" class="gutter-top">
                <div v-for="n in 1" :key="n" class="column fill">第{{n}}列</div>
            </virtual-scroller>
        </section>

        <!-- Y轴滚动 -->
        <v-group class="gutter ">
            <h4 class="border-bottom fill-bottom">Y轴滚动, scrollTop: {{pos2.y}} </h4>
            <v-cell>
                <a-input v-model="pos2.y" placeholder="请输入"></a-input>
            </v-cell>
            <virtual-scroller v-model="pos2" class="border-bottom" style="height:300px;">
                <input v-model="input" placeholder="请输入" class="border fill"/>
                <div v-for="n in 20" :key="n" class="cell fill">第{{n}}行信息
                </div>
            </virtual-scroller>
        </v-group>
    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VGroup from '@/packages/Group/Group';
import VInput from '@/packages/Input/Input';
import VCount from '@/packages/Counter/Counter';
import VScrollView from '@/packages/ScrollView/ScrollView';
import VirtualScroller from '@/packages/VirtualScroller/VirtualScroller';
export default {
    name: 'ScrollViewDemo',

    data() {
        return {
            input: '',
            pos1: {
                y: 0,
                x: 0
            },

            pos2: {
                y: 0,
                x: 0
            }
        };
    },

    methods: {},

    components: {
        VCell,
        VGroup,
        VInput,
        VCount,
        VScrollView,
        VirtualScroller
    }
};
</script>
<style scoped lang="scss">
.column {
    word-break: keep-all;
    align-self: center;
    height: 60px;
    width:100px;
}

.column:nth-child(2n + 1) {
    background: #eee;
}
.column:nth-child(2n) {
    background: #ddd;
}

.cell {
    height: 200px;
}

.cell:nth-child(2n) {
    background: #ddd;
}

.cell:nth-child(2n + 1) {
    background: #eee;
}
</style>
