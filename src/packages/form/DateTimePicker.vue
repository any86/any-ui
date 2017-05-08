<template>
    <div class="com-date-time-picker">
        <input class="form-control flatpickr" :placeholder="opts.placeholder" :value="value" />
    </div>
</template>
<script>
import Flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
import {zh} from 'flatpickr/dist/l10n/zh.js';
export default {
    name: 'dateTimePicker',

    props: {
        value: {
            type: String
        },
        opts: {
            type: Object
        }
    },

    data() {
        return {
            fp: null
        };
    },

    mounted() {
        this.fp = new Flatpickr(this.$el.children[0], {
            locale: zh,
            ...this.opts.thirdPartyOptions,
            onClose: (selectedDates, dateStr)=> {
                this.$emit('input', dateStr);
            }
        });
    },
    destroyed() {
        this.fp.destroy()
        this.fp = null
    }
}
</script>
<style scoped lang="scss">

</style>
