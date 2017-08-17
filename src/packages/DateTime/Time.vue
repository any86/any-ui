<template>
    <div class="component-time">
        <div class="graticule"></div>
        <!-- 小时 -->
        <span ref="hour" class="hour" @touchstart="touchStart('hour',  $event)" @touchmove="touchMove('hour',  $event)" @touchend="touchEnd('hour', 24, $event)">
            <ul :style="{transform: 'translateY('+hour.translateYNew+'px)'}" :class="{transition: 3 == hour.status}">
                <li :class="{active: hour.value == h-1}" v-for="h in 24" :key="h">{{zeroize(h-1)}} 点</li>
            </ul>
        </span>
        <!-- 分钟 -->
        <span ref="minute" class="minute" @touchstart="touchStart('minute',  $event)" @touchmove="touchMove('minute',  $event)" @touchend="touchEnd('minute', 60,  $event)">
            <ul :style="{transform: 'translateY('+minute.translateYNew+'px)'}" :class="{transition: 3 == minute.status}">
                <li :class="{active: minute.value == m-1}" v-for="m in 60" :key="m">{{zeroize(m-1)}} 分</li>
            </ul>
        </span>
        <!-- 秒 -->
        <span ref="seconds" class="seconds" @touchstart="touchStart('seconds',  $event)" @touchmove="touchMove('seconds',  $event)" @touchend="touchEnd('seconds', 60, $event)">
            <ul :style="{transform: 'translateY('+seconds.translateYNew+'px)'}" :class="{transition: 3 == seconds.status}">
                <li :class="{active: seconds.value == s-1}" v-for="s in 60" :key="s">{{zeroize(s-1)}} 秒</li>
            </ul>
        </span>
    </div>
</template>
<script>
export default {
    name: 'Time',

    props: {
        value: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            itemHeight: '0', // 下面scss中也有定义, 修改需同步
            hour: {
                status: 0, // touch状态
                value: 5,
                translateYOld: 0,
                translateYNew: 0,
                status: 0,
                start: 0,
                current: 0,
                distance: 0
            },
            minute: {
                status: 0,
                value: 5,
                translateYOld: 0,
                translateYNew: 0,
                status: 0,
                start: 0,
                current: 0,
                distance: 0
            },
            seconds: {
                status: 0,
                value: 2,
                translateYOld: 0,
                translateYNew: 0,
                status: 0,
                start: 0,
                current: 0,
                distance: 0
            }
        };
    },

    mounted() {
        // 时间string转成json
        this.parseValue();
        this.itemHeight = getComputedStyle(this.$el.querySelectorAll('li')[0], null).height;
        this.itemHeight = parseFloat(this.itemHeight);
        this.hour.translateYOld = this.hour.translateYNew = 0 - this.hour.value * this.itemHeight;
        this.minute.translateYOld = this.minute.translateYNew = 0 - this.minute.value * this.itemHeight;
        this.seconds.translateYOld = this.seconds.translateYNew = 0 - this.seconds.value * this.itemHeight;
    },

    methods: {
        /**
         * 开始拖拽
         * @param  {String} who 哪一列
         * @param  {[type]} e   event
         */
        touchStart(who, e) {
            this[who].status = 1;
            this[who].start = e.touches[0].clientY;
        },
        /**
         * 拖拽中
         * @param  {String} who 哪一列
         * @param  {[type]} e   event
         */
        touchMove(who, e) {
            this[who].status = 2;
            // 算移动距离
            this[who].current = e.touches[0].clientY;
            this[who].distance = this[who].current - this[who].start;
            // UI移动距离
            if (this.itemHeight * 5 >= this[who].translateYNew) {
                this[who].translateYNew = this[who].translateYOld + this[who].distance;
            }
        },
        /**
         * 拖拽结束
         * @param  {String} who 哪一列
         * @param  {Number} rowCount 共多少列
         * @param  {[type]} e   event
         */
        touchEnd(who, rowCount, e) {
            // 结束拖拽
            this[who].status = 3;
            // 边界
            if (0 < this[who].translateYNew) {
                this[who].translateYNew = 0;
            } else if (0 - this.itemHeight * (rowCount - 1) > this[who].translateYNew) {
                this[who].translateYNew = 0 - this.itemHeight * (rowCount - 1)
            }

            // 对准(四舍五入)
            this[who].value = Math.round((0 - this[who].translateYNew) / this.itemHeight);
            this[who].translateYNew = 0 - this[who].value * this.itemHeight;

            // 记录本次位移
            this[who].translateYOld = this[who].translateYNew;

            // 同步v-model
            this.$emit('input', [this.zeroize(this.hour.value), this.zeroize(this.minute.value), this.zeroize(this.seconds.value)].join(' : '));
        },

        parseValue() {
            [this.hour.value, this.minute.value, this.seconds.value] = this.value.split(':');
            this.hour.value = parseInt(this.hour.value);
            this.minute.value = parseInt(this.minute.value);
            this.seconds.value = parseInt(this.seconds.value);
        },
        /**
         * 个位补0, 只支持100以内的数字
         * @param  {Number} number
         * @return {String} 0开头的数字
         */
        zeroize(number) {
            return ('0' + number).substr(-2);
        }
    },

    watch: {
        value(time) {
            // 时间string转成json
            this.parseValue();
            this.hour.translateYOld = this.hour.translateYNew = 0 - this.hour.value * this.itemHeight;
            this.minute.translateYOld = this.minute.translateYNew = 0 - this.minute.value * this.itemHeight;
            this.seconds.translateYOld = this.seconds.translateYNew = 0 - this.seconds.value * this.itemHeight;
        }
    },

    destroyed() {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$width: percentage(1/3);
$itemHeight: .6rem; // 上面js变量中也定义了, 修改需同步
.component-time {
    position: relative;
    background: $background;
    display: inline-block;
    overflow: hidden;
    width: 100%;
    box-sizing: content-box;
    font-size: 0;
    >.graticule {
        height: $itemHeight;
        width: 100%;
        box-shadow: $shadowUp, $shadowDown;
        // border: 1px solid $lighter;
        position: absolute;
        z-index: 1;
        top: 3*$itemHeight;
        left: 0;
    }
    >span {
        position: relative;
        z-index: 2;
        overflow: hidden;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        height: $itemHeight * 7;
        width: $width;
        >ul {
            box-sizing: border-box;
            display: block;
            width: 100%;
            padding: (3*$itemHeight) 0;
            li {
                box-sizing: border-box;
                font-size: .3rem;
                width: 100%; // 不设置宽度, 滚动条会挤宽度
                text-align: center;
                height: $itemHeight;
                line-height: $itemHeight;
                display: block;
                &:active {
                    color: $base;
                }
                &.active {
                    color: $base;
                }
            }
        }
    }
}

.transition {
    transition: all .3s;
}
</style>
