<template>
    <div class="page-explore">
        <VTabs v-model="tabsActiveIndex">
            <VTabsItem>WAHT'S NEW</VTabsItem>
            <VTabsItem>PRESALE</VTabsItem>
        </VTabs>
        <LayoutNew v-show="0 == tabsActiveIndex" class="tabs-content"></LayoutNew>
        <LayoutPresale v-show="1 == tabsActiveIndex" class="tabs-content"></LayoutPresale>
    </div>
</template>
<script>
import VTabs from '@/packages/Tabs/Tabs'
import VTabsItem from '@/packages/Tabs/TabsItem'

import LayoutNew from './Explore/New'
import LayoutPresale from './Explore/Presale'
export default {
    name: 'Explore',

    data() {
        return {
            scrollY: 0,
            tabsActiveIndex: 0
        }
    },

    mounted() {


    },

    components: {
        VTabs,
        VTabsItem,
        LayoutNew,LayoutPresale,
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-explore {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .tabs-content {
        flex: 1;
    }
}
</style>
