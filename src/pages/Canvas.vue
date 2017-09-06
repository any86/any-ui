<template>
    <ScrollView v-model="scrollY">
        <h4>type: {{lockPan}}</h4>
        <!-- <h4>ev: {{ev}}</h4> -->
        <!-- <VInput v-model="rotation"></VInput>  -->
        <div ref="view" class="view">
            <div ref="box" class="box" :style="{transform: `translate3d(${translateX}px, ${translateY}px, 0)`}">
                <img ref="avator" class="avator" src="../assets/avator.jpeg" :style="{transform: `rotate(${angle}deg) scale(${scale})`}">
            </div>
        </div>
        <button @click="reset" class="button button-default button-block ">复位</button>
        <button @click="addScale" class="button button-info button-block ">放大</button>
        <button @click="minusScale" class="button button-info button-block ">缩小</button>
        <button @click="minusAngle" class="button button-success button-block ">旋转-</button>
        <button @click="addAngle" class="button button-success button-block ">旋转+</button>
        <button @click="moveRight" class="button button-warning button-block ">向右</button>
        <button @click="moveLeft" class="button button-warning button-block ">向左</button>
        <button @click="moveUp" class="button button-danger button-block ">向上</button>
        <button @click="moveDown" class="button button-danger button-block ">向下</button>

    </ScrollView>
</template>
<script>
import VInput from '@/packages/Input/Input'
import Hammer from 'hammerjs'
export default {
    name: 'Canvas',

    data() {
        return {
            ev: null,

            type: '',
            scrollY: 0,
            // 缩放
            scale: 1,
            lastScale: 1,
            // 旋转
            startRotation: 0, // 2手指形成的角度
            angle: 0, // 元素旋转角度
            lastAngle: 0, // 上次停止触碰时, 元素的旋转角度
            // 平移
            translateX: 0, translateY: 0, lastTranslateX: 0, lastTranslateY: 0,

            lockPan: false,
            lockPanTimer: null,
        }
    },

    mounted() {
        try {
            let hammertime = new Hammer.Manager(this.$refs.view);
            hammertime.add(new Hammer.Pinch());
            hammertime.add(new Hammer.Rotate());
            hammertime.add(new Hammer.Pan());

            hammertime.get('pinch').recognizeWith('rotate');
            // hammertime.get('pan').requireFailure('pinch');
            // hammertime.get('pan').requireFailure('rotate');

            hammertime.on('rotatestart', (ev) => {
                this.startRotation = ev.rotation;
                this.lastAngle = this.angle;
            });

            hammertime.on('rotatemove', (ev) => {
                var activeRotation = ev.rotation - this.startRotation;
                this.angle = this.lastAngle + activeRotation;
                ev.preventDefault();
            });

            hammertime.on('rotateend', (ev) => {
                // this.lastAngle = this.angle;
                this.lockPan = true;
                clearTimeout(this.lockPanTimer);
                this.lockPanTimer = setTimeout(() => {
                    this.lockPan = false;
                }, 200)
            });

            // 缩放
            hammertime.on('pinchstart', (ev) => {
                this.lastScale = this.scale;
            });

            hammertime.on('pinchmove', (ev) => {
                this.scale = this.lastScale * ev.scale;
            });

            hammertime.on('pinchend', (ev) => {
                // this.lastScale = this.scale;
            });

            // 平移
            hammertime.on('panstart', (ev) => {
                if (!this.lockPan) {
                    this.lastTranslateX = this.translateX;
                    this.lastTranslateY = this.translateY;
                }
            });

            hammertime.on('panmove', (ev) => {
                if (!this.lockPan) {
                    this.translateX = this.lastTranslateX + ev.deltaX;
                    this.translateY = this.lastTranslateY + ev.deltaY;
                    ev.preventDefault();
                }
            });

            hammertime.on('panend', (ev) => {
                // if (!this.lockPan) {
                // }
            });

        } catch (e) {
            console.log(e)
        }
    },

    methods: {
        addScale(){
            this.scale+= .1;
        },

        minusScale(){
            this.scale-= .1;
        },

        moveLeft() {
            this.translateX -= 10;
        },

        moveRight() {
            this.translateX += 10;
        },

        moveUp() {
            this.translateY-= 10;
        },

        moveDown() {
            this.translateY+= 10;
        },

        minusAngle() {
            this.angle -= 10;
        },

        addAngle() {
            this.angle += 10;
        },

        reset(){
            this.angle = 0;
            this.scale = 1;
            this.translateX = 0;
            this.translateY = 0;
        }
    },
    components: { VInput }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
h4 {
    word-break: break-all;
}

.box {
    display: inline-block;
    background: #ccc;
    border-bottom: 1px solid $lightest;
}

.avator {
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
}
</style>
