<template>
    <main class="demo-page fill">
        <section 
            ref="panel"
            class="atom-img-panel  border ovh">
            <!-- 图片 -->
            <img 
            @click="clickHandle"
            v-touch:tap.stop.prevent="tapHandle"
            v-touch:doubletap.stop.prevent="doubletapHandle"
            v-touch:press.stop.prevent="pressHandle"
            v-touch:pressup.stop.prevent="pressupHandle"
            v-touch:swipe.stop.prevent="swipeHandle"
            v-touch:panstart.stop.prevent="panStartHandle"
            v-touch:panmove.stop.prevent="panMoveHandle"
            v-touch:panend.stop.prevent="panEndHandle"
            v-touch:pinchmove.stop.prevent="pinchMoveHandle"
            v-touch:rotate.stop.prevent="rotateHandle"
            v-touch:rotatestart.stop.prevent="rotateStartHandle"
            
            :style="{transformOrigin:`${centerX} ${centerY}`,transitionDuration: `${transitionDuration}ms`, transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`}" :src="longImages[0]" width="100%" />
        </section>
        <p class="text-danger gutter-top-sm">请拖动图片尝试</p>
        <h3 class="gutter-top">支持: </h3>
        <p :class="{scale: 'tap' === action}" class="text-darkest gutter-top-sm font-big">tap(单击)</p>
        <p :class="{scale: 'doubletap' === action}" class="text-darkest gutter-top-sm font-big">doubletap(双击)</p>
        <p :class="{scale: 'press' === action}" class="text-darkest gutter-top-sm font-big">press(按住)</p>
        <p :class="{scale: 'pressup' === action}" class="text-darkest gutter-top-sm font-big">pressup(按住然后放手)</p>
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
            rotate: 70,
            deltaX: 0,
            deltaY: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            action: 'none',
            centerX: 'center',
            centerY: 'center'
        };
    },

    methods: {
        panStartHandle(e) {
            // console.log('panstart', e, Date.now());
        },

        panMoveHandle({ deltaX, deltaY, type }, e) {
            // console.log(type, Date.now(), type, deltaX, deltaY);
            this.transitionDuration = 0;
            this.x += deltaX;
            this.y += deltaY;
            this.action = 'none';
            setTimeout(() => {
                this.action = 'pan';
            }, 10);
        },

        panEndHandle(e) {
            // console.log('panend', e, Date.now());
        },

        rotateStartHandle(e) {
            console.log('rotatestart', e, Date.now());
        },

        rotateMoveHandle(e) {
            // console.log('rotatemove', e, Date.now());
        },

        rotateEndHandle(e) {
            // console.log('rotateend', e, Date.now());
        },

        pinchStartHandle(e) {
            this.transitionDuration = 0;
            // console.log('pinchStart', e, Date.now());
        },

        pinchMoveHandle({ type, scale, centerX, centerY }) {
            // console.log({ type, scale, centerX, centerY }, Date.now());
            this.action = 'none';
            this.scale *= scale;
            setTimeout(() => {
                this.action = 'pinch';
            }, 0);
            // this.centerX = centerX + 'px';
            // this.centerY = centerY + 'px';
        },

        pinchEndHandle(e) {
            this.transitionDuration = 0;
            // log('pinchEnd', e, Date.now());
        },
        touchstart() {
            this.action = 'none';
        },

        clickHandle(e) {
            log('click', e, Date.now());
        },

        tapHandle(data, e) {
            this.action = 'none';
            // log('tap', Date.now());
            setTimeout(() => {
                this.action = 'tap';
            }, 100);
        },

        pressHandle(e) {
            this.action = 'none';
            // log('press', Date.now());
            setTimeout(() => {
                this.action = 'press';
            }, 100);
        },

        pressupHandle(e) {
            this.action = 'none';
            // log('pressup', Date.now());
            setTimeout(() => {
                this.action = 'pressup';
            }, 100);
        },

        swipeHandle({ deltaX, deltaY, velocityX, velocityY, type, direction }) {
            // console.log({ deltaX, deltaY, velocityX, velocityY, type, direction }, Date.now());
            this.action = type;
            this.transitionDuration = 200;
            this.$nextTick(() => {
                this.x += deltaX * 2;
                this.y += deltaY * 2;
            });
        },

        doubletapHandle({ type }, e) {
            // console.log(type, e);
            this.action = 'none';
            setTimeout(() => {
                this.action = 'doubletap';
            }, 200);
        },

        multitapHandle({ type }, e) {
            console.log(type, e);
            this.action = 'none';
            setTimeout(() => {
                this.action = 'multitap';
            }, 200);
        },

        rotateHandle({ angle, centerX, centerY }) {
            // console.log('rotate', Date.now(), centerX, centerY);
            // this.centerX = centerX+'px';
            // this.centerY = centerY+'px';
            this.rotate += angle;
            this.action = 'none';
            setTimeout(() => {
                this.action = 'rotate';
            }, 0);
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
