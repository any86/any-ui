<template>
    <section>
        <!-- 上传前 -->
        <img v-show="'' == uploadDataURL" :src="demoURL" width="100%">
        <!-- 上传后 -->
        <div v-show="'' !== uploadDataURL" ref="view" class="view">
            <svg ref="svg" :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`" width="100%" preserveAspectRatio="xMidYMid meet">
                <g :transform="`translate(${translateX} ${translateY})`">
                    <image x="0" y="0" :width="viewBoxWidth" height="100%" :xlink:href="uploadDataURL" :transform="`rotate(${angle}, ${viewBoxWidth/2} ${viewBoxHeight/2}) translate(${viewBoxWidth/2} ${viewBoxHeight/2}) scale(${scale}) translate(-${viewBoxWidth/2} -${viewBoxHeight/2})`" />
                </g>
                <image x="0" y="0" :width="viewBoxWidth" height="100%" :xlink:href="coverDataURL" />
            </svg>
        </div>

        <section class="tools-bar">
            <span class="button-item" @click="moveLeft">
                <Icon value="back"></Icon>
            </span>
            <span class="button-item" @click="moveRight">
                <Icon value="more"></Icon>
            </span>
            <span class="button-item" @click="moveUp">
                <Icon value="less"></Icon>
            </span>
            <span class="button-item" @click="moveDown">
                <Icon value="moreunfold"></Icon>
            </span>
            <span class="button-item" @click="minusScale">
                <Icon value="subtract"></Icon>
            </span>
            <span class="button-item" @click="addScale">
                <Icon value="add"></Icon>
            </span>
            <span class="button-item" style="transform:scaleX(-1)" @click="minusAngle">
                <Icon value="refresh"></Icon>
            </span>
            <span class="button-item" @click="addAngle">
                <Icon value="refresh"></Icon>
            </span>
            <span class="button-item" @click="reset">
                <Icon value="28"></Icon>
            </span>
        </section>
    </section>
</template>
<script>
import VInput from '@/packages/Input/Input'
import VSpinner from '@/packages/Spinner/Spinner'
import Hammer from 'hammerjs'
export default {
    name: 'Canvas',

    props: {
        uploadDataURL: {
            type: String
        },

        demoURL: {
            type: String
        }
    },

    data() {
        return {
            hammertime: null,
            // viewbox
            viewBoxWidth: 500, // 对应模具图片
            viewBoxHeight: 400,

            coverDataURL: '',
            prewiewDataURL: '',

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

    async mounted() {
        var coverImage = await imageLoader('../static/C046.png');
        this.coverDataURL = image2DataURL(coverImage);
        // 同时通知封面图片已经加载完毕
        this.$emit('mounted', this.$refs.svg);
        // 手势
        this._hammer();

    },

    methods: {
        _hammer() {
            this.hammertime = new Hammer.Manager(this.$refs.view);
            this.hammertime.add(new Hammer.Pinch());
            this.hammertime.add(new Hammer.Rotate());
            this.hammertime.add(new Hammer.Pan());

            this.hammertime.get('pinch').recognizeWith('rotate');
            // this.hammertime.get('pan').requireFailure('pinch');
            // this.hammertime.get('pan').requireFailure('rotate');

            this.hammertime.on('rotatestart', (ev) => {
                this.startRotation = ev.rotation;
                this.lastAngle = this.angle;
            });

            this.hammertime.on('rotatemove', (ev) => {
                var activeRotation = ev.rotation - this.startRotation;
                this.angle = this.lastAngle + activeRotation;
                ev.preventDefault();
            });

            this.hammertime.on('rotateend', (ev) => {
                // this.lastAngle = this.angle;
                this.lockPan = true;
                clearTimeout(this.lockPanTimer);
                this.lockPanTimer = setTimeout(() => {
                    this.lockPan = false;
                }, 200)
            });

            // 缩放
            this.hammertime.on('pinchstart', (ev) => {
                this.lastScale = this.scale;
            });

            this.hammertime.on('pinchmove', (ev) => {
                this.scale = this.lastScale * ev.scale;
            });

            this.hammertime.on('pinchend', (ev) => {
                // this.lastScale = this.scale;
            });

            // 平移
            this.hammertime.on('panstart', (ev) => {
                if (!this.lockPan) {
                    this.lastTranslateX = this.translateX;
                    this.lastTranslateY = this.translateY;
                }
            });

            this.hammertime.on('panmove', (ev) => {
                if (!this.lockPan) {
                    this.translateX = this.lastTranslateX + ev.deltaX;
                    this.translateY = this.lastTranslateY + ev.deltaY;
                    ev.preventDefault();
                }
            });

            this.hammertime.on('panend', (ev) => {
                // if (!this.lockPan) {
                // }
            });
        },

        addScale() {
            this.scale += .1;
        },

        minusScale() {
            this.scale -= .1;
        },

        moveLeft() {
            this.translateX -= 10;
        },

        moveRight() {
            this.translateX += 10;
        },

        moveUp() {
            this.translateY -= 10;
        },

        moveDown() {
            this.translateY += 10;
        },

        minusAngle() {
            this.angle -= 10;
        },

        addAngle() {
            this.angle += 10;
        },

        reset() {
            this.angle = 0;
            this.scale = 1;
            this.translateX = 0;
            this.translateY = 0;
        }
    },
    components: { VInput, VSpinner },

    watch: {
        uploadDataURL() {
            this.reset();
        }
    },

    destroyed() {
        this.hammertime.destroy();
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.view {
    width: 100%;
    .demo {
        width: 100%;
    }
    .box {
        display: inline-block;
    }
}

.tools-bar {
    position: relative;
    display: flex;
    margin: $gutter auto;
    .button-item {
        flex: 1;
        color: $dark;
        font-size: .4rem;
        text-align: center;
        &:active {
            background: $lightest;
            color: $light;
        }
    }
}
</style>
