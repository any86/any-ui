<template>
    <a-scroll-view class="demo-page">
        <a-breadcrumb :data-source="dataSource" @click-item="clickItem" />
    </a-scroll-view>
</template>
<script>
import { AScrollView, ABreadcrumb } from '@/packages'

export default {
    name: 'BreadcrumbDemo',

    data() {
        return {
            dataSource: ['首页', '系统设置', '权限管理'],
        };
    },

    methods: {
        clickItem(index){
            this.$alert(index);
        }
    },

    components: {
        AScrollView,
        ABreadcrumb
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
