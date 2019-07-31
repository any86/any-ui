<template>
    <main class="app">
        <v-app-bar @click-arrow="$router.back()" :has-arrow="'index' !== $route.name"><a @click="$router.push({'path': '/'})">any-ui</a></v-app-bar>
        <transition name="slide-left" mode="out-in">
            <!-- <keep-alive> -->
                <router-view class="app-main"></router-view>
            <!-- </keep-alive> -->
        </transition>
    </main>
</template>
<script>
import VQRCode from '@/packages/QRCode/QRCode';
import VDrawer from '@/packages/Drawer/Drawer';
import VAppBar from '@/packages/AppBar/AppBar';
export default {
    name: 'App',

    data() {
        return {
            isShowDrawer: false
        };
    },

    components: {
        VAppBar,
        VDrawer,
        VQRCode
    }
};
</script>
<style lang="scss" scoped>
@import './scss/variables.scss';
</style>
