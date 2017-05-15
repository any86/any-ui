<template>
    <div class="component-date">
        <div class="weekdays">
            <span class="weekday" v-for="weekday in weekdays">{{weekday}}</span>
        </div>
        <div class="days">
            <span class="day day-prev" v-for="day in prevMonthDays" :key="day.obj" @click="selectDay(day.obj)">
                {{day.num}}
            </span>
            <span :class="['day', i == activeIndex && 'active']" v-for="(day, i) in days" :key="day.obj" @click="selectDay(day.obj)">
                {{day.num}}
            </span>
            <span class="day day-next" v-for="day in nextMonthDays" :key="day.obj" @click="selectDay(day.obj)">
                {{day.num}}
            </span>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: 'DatePanel',

    props: {
        format: {
            type: String,
            default: 'Y-MM-DD'
        },

        value: {
            type: String
        }
    },

    mounted() {
        moment.locale('zh-cn');
        this.prevMonthDays = this.getPrevMonthDays();
        this.days = this.getDays();
        this.nextMonthDays = this.getNextMonthDays();
    },

    data() {
        return {
            activeIndex: null, // 当前日期索引
            beginDayInMonth: {}, // 本月第一天
            weekdays: ['日', '一', '二', '三', '四', '五', '六'],
            prevMonthDays: [], // 存储前月的部分日期
            days: [], // 存储本月日期
            nextMonthDays: [] // 存储下个月的部分日期
        };
    },

    methods: {
        selectDay(obj) {
            this.$emit('input', obj.format(this.format));
        },

        getPrevMonthDays() {
            var days = [];
            // 本月的第一天
            this.beginDayInMonth = moment.utc(this.value).startOf('month');
            // 上个月最后一天
            var endDayInPrevMonth = moment(this.beginDayInMonth).subtract(1, 'day');
            // 上个月总天数
            var length = moment(endDayInPrevMonth).daysInMonth();

            // 上个月最后一天是周几
            var endDayWeekDayInPrevMonth = moment(endDayInPrevMonth).day();
            for (var i = 0; i <= endDayWeekDayInPrevMonth; i++) {
                var obj = moment(endDayInPrevMonth).subtract(i, 'day');
                var num = obj.date();
                days.splice(0, 0, {
                    num,
                    obj
                });
            }
            return days;
        },

        getDays() {
            var days = [];
            // 本月总天数
            var length = moment.utc(this.value).daysInMonth();
            for (var i = 1; i <= length; i++) {
                var day = moment(this.beginDayInMonth).add(i - 1, 'day');
                if (moment(this.value).isSame(day, 'day')) {
                    this.activeIndex = i - 1;
                }
                days.push({
                    num: i,
                    obj: day
                });
            }
            return days;
        },

        getNextMonthDays() {
            var days = [];
            var length = 42 - this.prevMonthDays.length - this.days.length;
            // 下个月第一天
            var beginDayInNextMonth = moment(this.beginDayInMonth).add(1, 'month');
            for (var i = 1; i <= length; i++) {
                days.push({
                    num: i,
                    obj: moment(beginDayInNextMonth).add(i - 1, 'day')
                });
            }
            return days
        }

    },

    watch: {
        value(newDate, oldDate) {
            if (!moment(newDate).isSame(oldDate, 'month')) {
                this.prevMonthDays = this.getPrevMonthDays();
                this.days = this.getDays();
                this.nextMonthDays = this.getNextMonthDays();
            } else {
                this.days = this.getDays();
            }
        }
    },

    destroyed() {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 40px;
$width: percentage(1/7);
$fontSize: 12px;
$gutter: 1px;
$borderWidth: 1px;
.component-date {
    padding: $gutter;
    width: 100%;
    background: $background;
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    .weekdays {
        font-size: 0;
        width: 100%;
        .weekday {
            width: $width;
            height: $height;
            line-height: $height;
            display: inline-block;
            text-align: center;
            font-size: $fontSize;
        }
    }
    .days {
        overflow: hidden;
        // 清除inline-block的空格间距
        font-size: 0;
        width: 100%;
        .day {
            box-sizing: border-box;
            transition: all .3s;
            width: $width;
            height: $height;
            line-height: $height;
            display: inline-block;
            text-align: center;
            font-size: $fontSize;
            border-radius: $borderRadius;
            border: 1px solid transparent;
            &:active {
                background: $lightest;
            }
            &.active {
                border-color: $base;
                color:$base;
            }
            &-prev {
                color: #ccc;
            }
            &-next {
                color: #ccc;
            }
        }
    }
}
</style>
