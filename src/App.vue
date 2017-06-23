<template>
    <VDrawer v-model="isShowSide" class="home">
        <ul class="menu" slot="side">
            <li>What's New</li>
            <li>Personalized Name Necklace</li>
            <li>New Arrivals</li>
            <li>All Personalized</li>
            <li>Personalized</li>
        </ul>
        <VLoading v-model="$store.state.isShowLoading"></VLoading>
        <transition name="app">
            <router-view></router-view>
        </transition>
    </VDrawer>
</template>
<script>
import * as types from "@/store/mutation-types";
import VDrawer from '@/packages/Drawer/Drawer'
import VLoading from '@/packages/Loading/Loading'

export default {
    name: 'App',

    data() {
        return {
        };
    },

    computed: {
        isShowSide: {
            get() {
                return this.$store.state.isShowSide;
            },

            set(value) {
                this.$store.commit(value ? types.SHOW_SIDE : types.HIDE_SIDE);
            }
        }
    },

    components: {
        VDrawer,
        VLoading
    }

}
</script>
<style lang="scss" scoped>
@import './scss/theme.scss';
.menu {
    display: block;
    li {
        padding: 3*$gutter;
        display: block;
        border-bottom: 1px solid $lightest;
        font-size: $big;
    }
}

//切换动画, 未完, 还没有判断进入和离开方向
.app-enter {
    transform: translate3d(100%, 0, 0);
}

.app-enter-active {
    will-change: transform;
    transition: transform 500ms ease;
    backface-visibility: hidden;
    perspective: 1000;
}

.app-leave-active {
    will-change: transform;
    transform: translate3d(-100%, 0, 0);
    transition: transform 500ms ease;
    backface-visibility: hidden;
    perspective: 1000;
}
</style>
