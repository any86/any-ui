<template>
    <VDrawer v-model="isShowSide" class="home">
        <ul class="menu" slot="side">
            <router-link tag="li" :to="{path: '/index'}">What's New</router-link>
            <li>Personalized Name Necklace</li>
            <li>New Arrivals</li>
            <li>All Personalized</li>
            <li>Personalized</li>
            <canvas id="canvas"></canvas>
        </ul>
        <VLoading v-model="$store.state.isShowLoading"></VLoading>
        <div class="main">
            <div class="body">
                <transition name="fadeLeft">
                    <router-view></router-view>
                </transition>
            </div>
            <LayoutFooter v-show="-1 != ['/index', '/category', '/explore', '/bag', '/my'].indexOf($route.path)">
            </LayoutFooter>
        </div>
    </VDrawer>
</template>
<script>
import * as types from "@/store/mutation-types";
import VDrawer from '@/packages/Drawer/Drawer'
import VLoading from '@/packages/Loading/Loading'
import LayoutFooter from '@/components/Footer'
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
        VLoading,
        LayoutFooter
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

.main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // position: relative;
    // height: 100%;
    // width: 100%;
    display: flex;
    flex-direction: column;
    .body {
        position: relative;
        flex: 1;
        height: 100%;
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
