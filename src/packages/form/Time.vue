<template>
    <div class="com-time">
        <input type="text" class="form-control" placeholder="小时" :value="parseInt(time[0]) + '点'" @change="changeHour" @focus="selectAll">
        <input type="text" class="form-control" placeholder="分钟" :value="parseInt(time[1]) + '分'" @change="changeMinute" @focus="selectAll">
    </div>
</template>
<script>
export default {
    name: 'time',

    props: {
        opts: {

        },

        value: {
            type: String
        }
    },

    data() {
        return {};
    },

    methods: {
        selectAll(e) {
            e.target.select();
        },

        changeHour(e) {
            var hour = parseInt(e.target.value);
            if (24 <= hour || 0 > hour) {
                hour = 0;
            }
            hour = '' + hour;
            if (1 >= hour.length) {
                hour = '0' + hour;
            }
            this.$emit('input', hour + ':' + this.time[1]);
        },

        changeMinute(e) {
            var minute = parseInt(e.target.value);
            if (60 <= minute || 0 > minute) {
                minute = 0;
            }

            syslog(minute)
            syslog(minute.length)

            minute = '' + minute;
            if (1 >= minute.length) {
                minute = '0' + minute;
            }
            this.$emit('input', this.time[0] + ':' + minute);
        }
    },

    computed: {
        time() {
            return this.value.split(':');
        }
    }
}
</script>
<style scoped lang="scss">
.com-time {
    
    overflow: hidden;
    input {
        width: 60px;
        float: left;
    }
    input+input {
        margin-left: 5px;
    }
}
</style>
