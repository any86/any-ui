<template>
    <section>
        <a-tabs v-model="index" class="fixed-bottom">
            <a-tabs-item>高度为calc(100% - 55px)</a-tabs-item>
            <a-tabs-item>events: scroll</a-tabs-item>
            <a-tabs-item>events: scroll-bottom</a-tabs-item>
            <a-tabs-item>events: change-direction</a-tabs-item>
            <a-tabs-item v-for="n in 10" :key="n">events: {{n}}</a-tabs-item>
        </a-tabs>

        <a-scroll-view v-if="0 == index" style="height: calc(100% - 55px);" class="border-bottom">
            <a-cell v-for="n in 30" :key="n">{{n}}</a-cell>
        </a-scroll-view>

        <template v-else-if="1 == index">
            <a-scroll-view style="height:300px;" class="border-bottom">
                <a-cell v-for="n in 30" :key="n">{{n}}</a-cell>
            </a-scroll-view>
        </template>
    </section>
</template>
<script>
import { AScrollView, ACell, ATabs, ATabsItem } from '@/packages'

export default {
    name: 'ScrollViewDemo',

    data() {
        return {
            index: 0
        };
    },

    methods: {
        handle(){
            alert(1)
        }
    },

    components: {
        AScrollView,
        ACell,
        ATabs,
        ATabsItem
    }
};
</script>
<style scoped lang="scss">

</style>
