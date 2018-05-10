<template>
    <main class="demo-page fill">
        {{willScale}}
        <section 
            ref="panel"
            v-touch:tap.stop.prevent="tapHandle"
            v-touch:doubleTap.stop.prevent="doubleTapHandle"  
            v-touch:pan.stop.prevent="panHandle"  
            v-touch:pinch.stop.prevent="pinchHandle"  
            v-touch:rotate.stop.prevent="rotateHandle"  
            v-touch:press.stop.prevent="pressHandle"  
            v-touch:swipe.stop.prevent="swipeHandle"  
            @click="clickHandle"
            @touchstart="touchstart"  
            class="atom-img-panel  border ovh">
            <img :style="{transitionDuration: `${transitionDuration}ms`, transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`}" :src="longImages[0]" width="100%" />
        </section>
        <p class="text-danger gutter-top-sm">请拖动图片尝试</p>
        <h3 class="gutter-top">支持: </h3>
        <p :class="{scale: 'tap' === action}" class="text-darkest gutter-top-sm font-big">tap(单击)</p>
        <p :class="{scale: 'doubleTap' === action}" class="text-darkest gutter-top-sm font-big">doubleTap(双击)</p>
        <p :class="{scale: 'press' === action}" class="text-darkest gutter-top-sm font-big">press(按住)</p>
        <p :class="{scale: 'pan' === action}" class="text-darkest gutter-top-sm font-big">pan(单指滑动)</p>
        <p :class="{scale: 'swipe' === action}" class="text-darkest gutter-top-sm font-big">swipe(单指快速滑动)</p>
        <p :class="{scale: 'pinch' === action}" class="text-darkest gutter-top-sm font-big">pinch(双指缩放)</p>
        <p :class="{scale: 'rotate' === action}" class="text-darkest gutter-top-sm font-big">rotate(双指旋转)</p>
        <v-button  type="primary" :is-ghost=" true" :is-block="true" @click="reset" class="gutter-top">复位</v-button>
    </main>
</template>
<script>
import VButton from '@/packages/Button/Button';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'FingerDemo',

    data() {
        return {
            longImages: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521520323983&di=539e1b13cb00ef35fc5762aa4a86c1b1&imgtype=0&src=http%3A%2F%2Fnpic7.fangtoo.com%2Fcn%2Fzixun%2Fzh-chs%2F2017-07%2F20%2F281137-201707201125064885.jpg'],
            transitionDuration: 0,
            scale: 1,
            rotate: 0,
            deltaX: 0,
            deltaY: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            action: 'none',
            willScale: 1
        };
    },

    methods: {
        touchstart() {
            this.action = 'none';
            // log('touchstart', Date.now());
        },

        clickHandle(e) {
            log('click', Date.now());
        },

        tapHandle(data, e) {
            log('tap', Date.now());
            this.action = 'tap';
        },

        pressHandle(e) {
            log('press', Date.now());
            this.action = 'press';
        },

        panHandle({ deltaX, deltaY }, e) {
            console.log('pan', Date.now(), deltaX, deltaY);
            this.transitionDuration = 0;
            this.x += deltaX;
            this.y += deltaY;
            this.action = 'none';
            setTimeout(() => {
                this.action = 'pan';
            }, 0);
        },

        pinchHandle({ type, scale }, e) {
            this.action = 'none';
            this.scale *= scale;
            setTimeout(() => {
                this.action = 'pinch';
            }, 0);
        },
        swipeHandle({ deltaX, deltaY, velocityX, velocityY, type }) {
            log('swipe', Date.now());
            this.action = type;
            this.transitionDuration = 200;
            this.x += deltaX * 2;
            this.y += deltaY * 2;
        },
        doubleTapHandle() {
            this.action = 'doubleTap';
        },

        rotateHandle({ angle }) {
            // return;
            this.rotate += angle;
            this.action = 'rotate';
        },



        reset() {
            this.x = 0;
            this.y = 0;
            this.rotate = 0;
            this.scale = 1;
            this.isShow = true;
        },

        zoom() {
            this.scale = 2;
        }
    },

    computed: {
        maxX() {
            return this.width * (this.scale - 1) / 2;
        },

        maxY() {
            return this.height * (this.scale - 1) / 2;
        }
    },

    components: {
        VButton,
        VScrollView
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
    .scale {
        transform-origin: left;
        animation: scale $duration;
    }

    @keyframes scale {
        from {
            transform: scale(1.2);
        }

        to {
            transform: scale(1);
        }
    }
}
</style>
