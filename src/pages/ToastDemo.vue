<template>
    <v-scroll-view class="demo-page">
        <v-cell @click="closeAfterTimeout">3秒后自动关闭</v-cell>
    </v-scroll-view>
</template>
<script>
import VScrollView from '@/packages/ScrollView/ScrollView';
import VCell from '@/packages/Cell/Cell';

export default {
    name: 'FingerDemo',

    data() {
        return {
            activeIndex: 0
        };
    },

    methods: {
        closeAfterTimeout(){
            this.$toast('3秒后自动关闭!', {delay: 3000});
        }
        
    },

    components: {
        VCell,
        VScrollView
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
