<template>
    <v-drawer v-model="isShowDrawer" :handler-width="10" mode="overlay">
        <ul class="app-menu" slot="side">
            <v-q-r-code></v-q-r-code>
            <router-link tag="li" :to="{path: '/index'}">What's New
            </router-link>
            <router-link :to="{path: '/checkout'}" tag="li">Checkout
            </router-link>
            <router-link :to="{path: '/payment'}" tag="li">payment
            </router-link>
            <li>All Personalized</li>
            <li>Personalized</li>
        </ul>

        <v-header-bar @click-arrow="$router.back()" :has-arrow="'index' !== $route.name"><a @click="$router.push({'path': '/'})">Atom-UI</a></v-header-bar>
        <main class="app-main">
            <transition name="zoom" mode="out-in">
                <router-view></router-view>
            </transition>
        </main>
    </v-drawer>
</template>
<script>
import VQRCode from '@/packages/QRCode/QRCode';
import VDrawer from '@/packages/Drawer/Drawer';
import VHeaderBar from '@/packages/HeaderBar/HeaderBar';
export default {
    name: 'App',

    data() {
        return {
            isShowDrawer: false
        };
    },

    components: {
        VHeaderBar,
        VDrawer,
        VQRCode
    }
};
</script>
<style lang="scss" scoped>
@import './scss/theme.scss';
.app-menu {
    li {
        padding: $gutter;
        border-bottom: 1px solid $lightest;
    }
}
.app-main {
    height: calc(100% - 55px);
    position: relative;
}
</style>
