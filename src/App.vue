<template>
    <v-drawer v-model="isShowDrawer" :handler-width="10" mode="overlay">

        <ul class="menu" slot="side">
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

        <v-header-bar :has-arrow="'index' !== $route.name">Atom-UI</v-header-bar>
        <main class="main">
            <transition :name="'zoom'">
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
$animate_speed: 1000ms;
@import './scss/theme.scss';

.menu {
    li {
        padding: $gutter;
        border-bottom: 1px solid $lightest;
    }
}
.main{height: calc(100% - 55px);position: relative;}

//切换动画, 未完, 还没有判断进入和离开方向
.in-enter {
    transform: translate3d(100%, 0, 0);
}

.in-enter-active {
    will-change: transform;
    transition: transform $animate_speed linear;
    backface-visibility: hidden;
    perspective: 1000;
}

.in-leave-active {
    will-change: transform;
    transform: translate3d(-100%, 0, 0);
    transition: transform $animate_speed linear;
    backface-visibility: hidden;
    perspective: 1000;
}

.out-enter {
    transform: translate3d(-100%, 0, 0);
}

.out-enter-active {
    will-change: transform;
    transition: transform $animate_speed linear;
    backface-visibility: hidden;
    perspective: 1000;
}

.out-leave {
    transform: translate3d(0, 0, 0);
}

.out-leave-active {
    will-change: transform;
    transform: translate3d(100%, 0, 0);
    transition: transform $animate_speed linear;
    backface-visibility: hidden;
    perspective: 1000;
}
</style>
