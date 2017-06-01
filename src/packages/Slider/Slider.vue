<template>
    <div class="component-range">
        <span class="title">
            <slot></slot>
        </span>
        <span class="control">
            <span class="min">{{min}}</span>
            <span class="content" @click="slideTo">
                <div ref="runway" class="runway"></div>
                <div :style="{width: touch.translateXNew + 'px'}" :class="['progress', 0 == touch.status && 'transition']"></div>
                <div ref="handle" :style="{transform: 'translate3d(' + touch.translateXNew + 'px, 0, 0)'}" :class="['handle', 0 == touch.status && 'transition']" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></div>
            </span>
            <span class="max">{{max}}</span>
        </span>
    </div>
</template>
<script>
export default {
    name: 'Range',

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        min: {
            type: Number,
            default: 0
        },

        max: {
            type: Number,
            default: 100
        },

        step: {
            type: Number,
            default: 1
        },

        value: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return {
            maxDistance: 0, // 滑道可用宽度
            touch: {
                translateXOld: 0,
                translateXNew: 0,
                status: 0,
                start: 0,
                current: 0,
                distance: 0
            }
        };
    },

    mounted() {
        // 滑道宽度 - 把手宽度
        this.maxDistance = this.$refs.runway.offsetWidth - this.$refs.handle.offsetWidth;
        // 滑动把手到默认值位置
        this._default();
    },

    methods: {
        /**
         * 滑动把手到默认值位置
         */
        _default() {
            this.touch.translateXNew = (this.value - this.min) / (this.max - this.min) * this.maxDistance;
            this.touch.translateXOld = this.touch.translateXNew;
        },

        slideTo(e) {
            var translateXNew = e.offsetX;
            if(this.maxDistance <= translateXNew) {
                translateXNew = this.maxDistance;
            }

            if(e.target != this.$refs.handle) {
                this.touch.translateXNew = translateXNew;
                this.touch.translateXOld = this.touch.translateXNew;                
            }
        },

        touchstart(e) {
            this.touch.status = 1;
            this.touch.start = e.touches[0].clientX;

        },

        touchmove(e) {
            this.touch.status = 2;
            this.touch.current = e.touches[0].clientX;
            this.touch.distance = this.touch.current - this.touch.start;

            // ** 判断放在最外层有不同的动画效果 **
            // 判断边界
            var translateXNew = this.touch.translateXOld + this.touch.distance;
            if (0 > translateXNew) {
                // 左侧边界判断
                this.touch.translateXNew = 0;
            } else if (this.maxDistance < translateXNew) {
                // 右侧边界判断
                this.touch.translateXNew = this.maxDistance;
            } else {
                this.touch.translateXNew = translateXNew;
            }
            e.preventDefault();
            e.stopPropagation();
        },

        touchend(e) {
            this.touch.status = 0;
            if (0 > this.touch.translateXNew) {
                this.touch.translateXNew = 0;
            }

            // 更新滑动位置
            this.touch.translateXOld = this.touch.translateXNew;

            // 同步value
            var value = this.min + (this.max - this.min) * (this.touch.translateXNew / this.maxDistance);
            this.$emit('input', Math.round(value));
        }
    },

    watch: {
        value() {
            // 滑动把手到默认值位置
            this._default();
        }
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
$height: .5rem;
.component-range {
    position: relative;
    display: flex;
    /*标题*/
    >.title {
        font-size: $big;
        line-height: $height;
        flex: 1;
        display: block;
        word-break: keep-all;
        margin-right: 10%;
    }
    /*控制*/
    >.control {
        display: flex;
        width: 100%;
        .min {
            padding: 0 $gutter;
            font-size: $big;
            line-height: $height;
            flex: 1;
        }
        .content {
            position: relative;
            height: $height;
            width: 100%;
            box-sizing: border-box;
            .runway {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                background: $light;
                height: 2px;
                width: 100%;
            }
            .progress {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                background: $base;
                height: 2px;
                width: 0;
            }
            .handle {
                position: absolute;
                z-index: 2;
                top: 0;
                left: 0;
                cursor: move;
                display: block;
                height: $height;
                width: $height;
                border-radius: 100%;
                background: $base;
                box-shadow: $shadowDown, $shadowUp;
            }
        }
        .max {
            padding: 0 $gutter;
            font-size: $big;
            line-height: $height;
            flex: 1;
        }
    }
}

.transition {
    transition: all .3s;
}
</style>
