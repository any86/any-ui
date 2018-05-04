<template>
    <section>
        <v-tabs v-model="index" class="fixed-bottom">
            <v-tabs-item>高度为calc(100% - 55px)</v-tabs-item>
            <v-tabs-item>events: scroll</v-tabs-item>
            <v-tabs-item>events: scroll-bottom</v-tabs-item>
            <v-tabs-item>events: change-direction</v-tabs-item>
            <v-tabs-item v-for="n in 10" :key="n">events: {{n}}</v-tabs-item>
        </v-tabs>

        <v-scroll-view v-if="0 == index" style="height: calc(100% - 55px);" class="border-bottom">
            <v-cell v-for="n in 30" :key="n">{{n}}</v-cell>
        </v-scroll-view>

        <template v-else-if="1 == index">
            <v-scroll-view style="height:300px;" class="border-bottom">
                <v-cell v-for="n in 30" :key="n">{{n}}</v-cell>
            </v-scroll-view>
        </template>
    </section>
</template>
<script>
import VTabs from '@/packages/Tabs/Tabs';
import VTabsItem from '@/packages/TabsItem/TabsItem';
import VCell from '@/packages/Cell/Cell';
import VScrollView from '@/packages/ScrollView/ScrollView';
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
        VCell,
        VTabs,
        VTabsItem,
        VScrollView
    }
};
</script>
<style scoped lang="scss">

</style>
