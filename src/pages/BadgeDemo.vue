<template>
    <v-scroll-view class="demo-page">
        <v-cell>
            购物车<v-badge :value="10"/>
        </v-cell>   

        <v-cell>
            <v-badge :value="13">新好友</v-badge>
        </v-cell>   

        <v-cell>
            <v-badge>邮件</v-badge>
        </v-cell>  

        <v-cell @click="$router.push({path: '/demos/tabs'})">
            与Tabs结合, 点击查看
        </v-cell>  


    </v-scroll-view>
</template>
<script>
import VBadge from '@/packages/Badge/Badge';
import VCell from '@/packages/Cell/Cell';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'BadgeDemo',

    data() {
        return {
        };
    },



    methods: {
    },

    computed: {
       
    },

    components: {
        VBadge,VCell,
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
