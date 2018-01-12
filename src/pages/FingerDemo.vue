<template>
    <v-scroll-view class="demo-page fill">
        <section ref="panel" class="atom-img-panel  border ovh">
            <img :style="{transitionDuration: `${transitionDuration}ms`, transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`}" :src="longImages[0]" width="100%" />
        </section>
        <p class="text-danger gutter-top-sm">请拖动图片尝试</p>
        <h3 class="gutter-top">支持: </h3>
        <p class="text-darkest gutter-top-sm font-big">tap(单击)</p>
        <p class="text-darkest gutter-top-sm font-big">doubleTap(双击)</p>
        <p class="text-darkest gutter-top-sm font-big">pan(单指滑动)</p>
        <p class="text-darkest gutter-top-sm font-big">swiper(单指快速滑动)</p>
        <p class="text-darkest gutter-top-sm font-big">pinch(双指缩放)</p>
        <p class="text-darkest gutter-top-sm font-big">rotate(双指旋转)</p>

        
        <v-button  type="primary" :is-ghost="true" :is-block="true" @click="reset" class="gutter-top">复位</v-button>
    </v-scroll-view>
</template>
<script>
import Finger from '../utils/finger.js';
import VButton from '@/packages/Button/Button';

import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'FingerDemo',

    data() {
        return {
            longImages: ['http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/11/43/1143dc058ee817f1c08074ced118b5cf.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/b2/f9/b2f9453ff2b87e81867e003ea66551ea.png', 'https://sfault-image.b0.upaiyun.com/197/510/1975102458-5a4babc8aba60'],
            transitionDuration: 0,
            scale: 1,
            rotate: 0,
            deltaX: 0,
            deltaY: 0,
            x: 0,
            y: 0,
            width: 0,
            height:0
        };
    },

    mounted() {
        const $el = this.$refs.panel;
        this.width = $el.offsetWidth;
        this.height = $el.offsetHeight;

        let finger = new Finger($el);
        finger.on('rotate', angle => {
            this.rotate += angle;
        });

        finger.on('pinch', scale => {
            const willScale = this.scale * scale;
            if (2 >= willScale) {
                this.scale *= scale;
            }
        });

        finger.on('tap', e => {
            log('tap');
        });

        finger.on('doubleTap', e => {
            log('doubleTap');
        });

        finger.on('press', e => {
            log('press');
        });

        finger.on('pan', ({ deltaX, deltaY }) => {
            this.transitionDuration = 0;
            this.x += deltaX;
            this.y += deltaY;
        });

        finger.on('swipe', ({ deltaX, deltaY, direction, holdTime, velocityX, velocityY, velocity }) => {
            this.transitionDuration = 1000;
            this.x += velocityX * 200 * Math.sign(deltaX);
            this.y += velocityY * 200 * Math.sign(deltaY);

        });
    },

    methods: {
        reset() {
            this.x = 0;
            this.y = 0;
            this.rotate = 0;
            this.scale = 1;
            this.isShow = true;
        },

        zoom(){
            this.scale = 2;
        }
    },

    computed: {
        maxX(){
            return this.width * (this.scale - 1) / 2;
        },

        maxY(){
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
}
</style>
