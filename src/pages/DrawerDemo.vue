<template>
    <a-scroll-view class="demo-page">
        <a-drawer v-model="isShowDrawer" :handler-width="10">
            <aside slot="side">
                <p class="fill">我是side</p>
            </aside>
            <main class="flex fill-full">
                <div class="flex-item--center">
                <a-button type="primary" :is-ghost="true" :is-block="true" @click="isShowDrawer=true">打开抽屉</a-button>
                <p align="center" class="text-darker gutter-top"> <span class="text-danger">提示: </span>手指从左侧边缘向右滑可以展开抽屉</p></div>
            </main>
        </a-drawer>
    </a-scroll-view>
</template>
<script>
import { AScrollView, AButton, ADrawer } from '@/packages'

export default {
    name: 'DrawerDemo',

    data() {
        return {
            isShowDrawer: false
        };
    },

    methods: {},

    computed: {},

    components: {
        AScrollView,
        AButton,
        ADrawer
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
// .demo-page {
//     // height: calc(100% - 55px);
// }
</style>
