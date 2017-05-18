<template>
    <div class="page-my">
        <ScrollView :pullable="false">
            <div class="box">
                <div class="circle">
                    <img src="https://avatars0.githubusercontent.com/u/8264787?v=3&s=460">
                </div>
            </div>
            <div style="padding:15px;">
            <VInput v-model="date" placeholder="请输入" type="text" :disabled="false" :maxlength="2">日期</VInput>
                <input type="text" v-model="date">
                <VSwitch v-model="checked"></VSwitch>
                <VButton @click="click" type="ghost" icon="remove" :loading="false" :disabled="false" :inline="false">Ok</VButton>
                <Checkbox v-model="checked"></Checkbox>
                <ImageTools></ImageTools>
            </div>
        </ScrollView>
        <VPopup v-model="checked">
            <h1 slot="header">Please Pickup Date</h1>
            <VDate v-model="date"></VDate>
            <!-- <VTime v-model="time"></VTime> -->
        </VPopup>
    </div>
</template>
<script>
import ImageTools from '@/packages/ImageTools/ImageTools'
import axios from 'axios';
import VPopup from '@/packages/Dialog/Popup'
import VDate from '@/packages/DateTime/Date'
import VTime from '@/packages/DateTime/Time'
import VButton from '@/packages/Button/Button'
import Checkbox from '@/packages/Checkbox/Checkbox'
import VSwitch from '@/packages/Switch/Switch'
import Upload from '@/packages/Upload/Upload'
import VInput from '@/packages/Input/Input'

export default {
    name: 'My',
    mounted() {

        axios.get('./mock/success')

    },
    data() {
        return {
            checked: false,
            date: '2017-01-01',
            time: '12:00:00'
        }
    },

    methods: {
        click() {
            this.$mask({VButton},'<VButton></VButton>')
        }
    },
    components: {
        VButton,
        Checkbox,
        VSwitch,
        VPopup,
        VDate,
        VTime,
        Upload,VInput,
        ImageTools
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-my {position: relative;height: 100%;
    .box {
        padding: .3rem;
        background: $background;
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
