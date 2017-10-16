<template>
<main class="full-screen">
    <VDrawer :value="true"  class="home">
        <ul class="menu" slot="side">
            <router-link tag="li" :to="{path: '/index'}">What's New</router-link>
            <router-link :to="{path: '/checkout'}" tag="li">Checkout</router-link>
            <router-link :to="{path: '/payment'}" tag="li">payment</router-link>
            <li>All Personalized</li>
            <li>Personalized</li>
            <li @click="changeCurrency('USD')">USD</li>
            <li @click="changeCurrency('GBP')">GBP</li>
            <canvas id="canvas" width="200"></canvas>
        </ul>
        <div class="main">
            <div class="body">
                <transition :name="'zoom'">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </VDrawer></main>
</template>
<script>
import VDrawer from '@/packages/Drawer/Drawer'
import VLoading from '@/packages/Loading/Loading'
import QRCode from 'qrcode'
export default {
    name: 'App',

    data() {
        return {
            show: true,
            qrcode: ''
        };
    },

    mounted() {
        var canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, window.location.href, function(error) {
            if (error) console.error(error)
        })
    },

    methods: {

    },

    computed: {

    },

    components: {
        VDrawer,
        VLoading
    }

}

</script>
<style lang="scss" scoped>
$animate_speed: 1000ms;
@import './scss/theme.scss';
.menu {
    display: block;
    background: $background;
    li {
        padding: $gutter;
        display: block;
        border-bottom: 1px solid $lightest;
    }
}

.main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .body {
        position: relative;
        flex: 1;
        height: 100%;
    }
}

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
