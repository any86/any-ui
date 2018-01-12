<template>
    <v-scroll-view class="demo-page">
        <v-bread-crumb :data-source="dataSource" @click-item="clickItem" />
    </v-scroll-view>
</template>
<script>
import VGroup from '@/packages/Group/Group';
import VBreadCrumb from '@/packages/BreadCrumb/BreadCrumb';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'BreadCrumbDemo',

    data() {
        return {
            dataSource: ['首页', '系统设置', '权限管理'],
        };
    },



    methods: {
        clickItem(index){
            alert(index)
        }
    },

    computed: {
       
    },

    components: {
        VGroup,VBreadCrumb,
        VScrollView
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
