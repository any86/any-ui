<template>
    <a-scroll-view>
        <a-cell>
            <template slot="title">学校</template>
            <a-input :vaildate="vaildates" v-model="text1"/>
        </a-cell>

        <a-cell>
            <template slot="title">银行卡流水</template>
            <a-input maxlength="14" v-model="text2" type="bankCode" />
        </a-cell>

        <a-cell>
            <template slot="title">手机</template>
            <a-input maxlength="13" v-model="text3" type="phone" />
        </a-cell>

        <a-cell>
            <template slot="title">流水号</template>
            <a-input maxlength="13" v-model="text4" type="number" />
        </a-cell>

        <a-cell>
            <template slot="title">字母</template>
            <a-input maxlength="13" v-model="text5" type="letter" />
        </a-cell>
    </a-scroll-view>
</template>
<script>
import { AScrollView, AInput, ACell } from '@/packages'

export default {
    name: 'InputDemo',

    data() {
        return {
            text1: 'hello vue !',
            text2: '0000 0000 0000 0000',
            text3: '133123456789',
            text4: '01234567',
            text5: 'abc',
            isShowWarning: true,
            vaildates: [
                { required: true, message: '学校不能为空!',}, 
                { message: '不能相同哦不同哦!',  fn: this.isSame},
                { regular: /a/, message: '必须包含a!',}]
        };
    },

    methods: {
        isSame(){
            return 1==1;
        }
    },

    components: {
        AInput,
        ACell,
        AScrollView
    }
};
</script>
<style scoped lang="scss">

</style>
