<template>
    <v-scroll-view>
        <v-cell>
            <template slot="title">学校</template>
            <v-input :vaildate="vaildates" v-model="text1"/>
        </v-cell>

        <v-cell>
            <template slot="title">银行卡流水</template>
            <v-input maxlength="14" v-model="text2" type="bankCode" />
        </v-cell>

        <v-cell>
            <template slot="title">手机</template>
            <v-input maxlength="13" v-model="text3" type="phone" />
        </v-cell>

        <v-cell>
            <template slot="title">流水号</template>
            <v-input maxlength="13" v-model="text4" type="number" />
        </v-cell>

        <v-cell>
            <template slot="title">字母</template>
            <v-input maxlength="13" v-model="text5" type="letter" />
        </v-cell>
    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VInput from '@/packages/Input/Input';
import VScrollView from '@/packages/ScrollView/ScrollView';
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
            vaildates: [{ required: true, message: '请选择活动区域', trigger: 'blur' }, { regular: /^a/, message: '不符合正则', trigger: 'blur' }]
        };
    },

    methods: {},

    components: {
        VInput,
        VCell,
        VScrollView
    }
};
</script>
<style scoped lang="scss">

</style>
