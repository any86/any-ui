<template>
    <div class="page-my">
        <div class="box">
            <div class="circle">
                <img src="https://avatars0.githubusercontent.com/u/8264787?v=3&s=460">
            </div>
        </div>
        <div style="padding:15px;">
            <VPopup v-model="checked">
                <h1 slot="header">Please Pickup Date</h1>
                <!-- <VDate v-model="date"></VDate> -->
                <VTime></VTime>
            </VPopup>
            <VSwitch v-model="checked"></VSwitch>
            <VButton type="ghost" icon="remove" :loading="false" :disabled="false" :inline="false">Ok</VButton>
            <Checkbox v-model="checked"></Checkbox>
        </div>
    </div>
</template>
<script>
import VPopup from '@/packages/Dialog/Popup'
import VDate from '@/packages/DateTime/Date'
import VTime from '@/packages/DateTime/Time'

import VButton from '@/packages/Button/Button'
import Checkbox from '@/packages/Checkbox/Checkbox'
import VSwitch from '@/packages/Switch/Switch'


export default {
    name: 'My',
    data() {
        return {
            checked: true,
            date: '2017-01-01',
            time: '12:01:30'
        }
    },
    components: {
        VButton,
        Checkbox,
        VSwitch,
        VPopup,
        VDate,
        VTime
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-my {
    .box {
        padding: .3rem;
        background: #fff;
        box-shadow: $shadowDown;
        .circle {
            width: 3rem;
            height: 3rem;
            border-radius: 100%;
            overflow: hidden;
            margin: auto;
            img {
                display: block;
                width: 100%;
            }
        }
    }
}
</style>
