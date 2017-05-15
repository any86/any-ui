<template>
    <div class="cell-time-panel">
        <span ref="hour" class="hour" @mouseenter="mouseenter" @mouseleave="mouseleave">
            <ul>
                <li v-for="h in 24"  :class="{active: hour == h-1}" @click="selectHour(h-1)">{{h-1}}</li>
            </ul>
        </span>
        <span ref="minute" class="minute" @mouseenter="mouseenter" @mouseleave="mouseleave">
            <ul>
                <li v-for="m in 60" :class="{active: minute == m-1}" @click="selectMinute(m-1)">{{m-1}}</li>
            </ul>
        </span>
        <span ref="seconds" class="seconds" @mouseenter="mouseenter" @mouseleave="mouseleave">
            <ul>
                <li v-for="s in 60" :class="{active: seconds == s-1}" @click="selectSeconds(s-1)">{{s-1}}</li>
            </ul>
        </span>
    </div>
</template>
<script>
import TWEEN from 'tween.js';
export default {
    name: 'TimePanel',

    props: {
        format: {
            type: String,
            default: 'HH : ii : SS'
        },

        value: {
            type: String
        }
    },

    data() {
        return {
            hour: 0,
            minute: 0,
            seconds: 0,
            itemHeight: 24 // 和scss高度一致
        };
    },

    mounted() {
        this.convert();
        this.selectHour(this.hour);
        this.selectMinute(this.minute);
        this.selectSeconds(this.seconds);

    },

    methods: {
        /** 
         * 缓动
         */
        tween(from, max, cb) {
            var vm = this;
            var tween = new TWEEN.Tween({
                    value: from
                })
                .to({
                    value: max
                }, 500)
                .easing(TWEEN.Easing.Cubic.In)
                .onUpdate(function() {
                    cb(this.value);
                    // console.log(this.value);
                })
                .start();
            animate();

            function animate() {
                requestAnimationFrame(animate);
                TWEEN.update();
            }
        },

        mouseenter(e) {
            e.target.style.overflowY = 'scroll';
        },

        mouseleave(e) {
            e.target.style.overflowY = 'hidden';
        },

        selectHour(hour) {
            this.hour = hour;
            var from = this.$refs.hour.scrollTop;
            var max = hour * this.itemHeight;
            this.tween(from, max, value => {
                this.$refs.hour.scrollTop = value;
            });
        },

        selectMinute(minute) {
            this.minute = minute;
            var from = this.$refs.minute.scrollTop;
            var max = minute * this.itemHeight;
            this.tween(from, max, value => {
                this.$refs.minute.scrollTop = value;
            });
        },

        selectSeconds(seconds) {
            this.seconds = seconds;
            var from = this.$refs.seconds.scrollTop;
            var max = seconds * this.itemHeight;
            this.tween(from, max, value => {
                this.$refs.seconds.scrollTop = value;
            });
        },

        convert() {
            [this.hour, this.minute, this.seconds] = this.value.split(':');
            this.hour = parseInt(this.hour);
            this.minute = parseInt(this.minute);
            this.seconds = parseInt(this.seconds);
        }
    },

    watch: {
        value(time) {
            this.convert();
        }
    },

    destroyed() {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$width: percentage(1/3);
$itemHeight: 24px;

.cell-time-panel {
    background: $background;
    display: inline-block;
    overflow: hidden;
    width: 100%;
    box-sizing: content-box;
    font-size: 0;
    >span {
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        position: relative;
        overflow-x: hidden;
        overflow-y: hidden;
        height: $itemHeight * 6;
        width: $width;
        >ul {
            box-sizing: border-box;
            display: block;
            width: 100%;
            padding-bottom: $itemHeight * 5;
            margin: 0;
            li {
                box-sizing: border-box;
                font-size: 12px;
                width: 100%; // 不设置宽度, 滚动条会挤宽度
                text-align: center;
                height: $itemHeight;
                line-height: $itemHeight;
                display: block;
                &.active {
                    background: $light;
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
    .hour {}
    .minute {}
    .seconds {}
}
</style>
