<template>
    <transition :name="'zoom'">
        <router-view></router-view>
    </transition>
</template>
<script>
import VDrawer from '@/packages/Drawer/Drawer'
import VLoading from '@/packages/Loading/Loading'
export default {
    name: 'App',

    data() {
        return {
            show: true,
            qrcode: ''
        };
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
