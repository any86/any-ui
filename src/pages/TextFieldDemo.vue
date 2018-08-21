<template>
    <main class="fill">
        <a-text-field 
            v-model="text1"
            :rules="rules"
            label="毕业学校">
            <template slot="label">
                <a-icon name="menu" size="16" />
                毕业学校
            </template>
            

            <div slot="append">append</div>
        </a-text-field>

        <a-text-field label="银行卡"  maxlength="19" v-model="text2" type="bankCode" />

        <a-text-field label="手 机" :is-select-all="true" maxlength="13" v-model="text3" type="phone"/>

        <a-text-field label="纯数字"  maxlength="13" v-model="text4" type="number"/>

        <a-text-field label="纯字母" maxlength="13" v-model="text5" type="letter" />

        <a-text-field label="自定义过滤规则(只能输入x/y/z)" :filter="/[^x-z]/g" v-model="text6"/>
    </main>
</template>
<script>
export default {
    name: 'TextFieldDemo',

    data() {
        const RULE_1 = { required: true, message: '学校不能为空!' };
        const RULE_2 = { trigger: 'keyup', minLength: 2, message: '至少2个字符!' };
        const RULE_3 = { trigger: 'keyup', maxLength: 3, message: '最多3个字符!' };
        const RULE_4 = { trigger: 'keyup', message: '值不能等于100', validator: this.isSame };
        const RULE_5 = { test: /a/, message: '必须包含a!' };
        const RULE_6 = { test: /b/, message: '必须包含b!' };
        const RULE_7 = { asyncValidator: this.asyncValidator };

        return {
            text1: '',
            text2: '0000 0000 0000 0000',
            text3: '133123456789',
            text4: '01234567',
            text5: 'abc',
            text6: 'xyz',
            isShowWarning: true,
            rules: [RULE_1, RULE_2, RULE_3, RULE_4, RULE_5, RULE_6, RULE_7],
        };
    },

    methods: {
        validate() {
            // this.$loading();
            this.$refs.inputSchool
                .validate()
                .then(() => {
                    this.$toast(`验证通过!`, { type: 'success' });
                    // this.$loading.close();
                })
                .catch(error => {
                    this.$toast(`验证结果: ${error}`);
                });
        },

        isSame() {
            return 100 != this.text1;
        },

        /**
         * 异步验证
         */
        asyncValidator(callback) {
            setTimeout(() => {
                callback({ isPass: 'nba' != this.text1, message: '服务端: nba已存在!' });
            }, 1000);
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../scss/variables.scss';
</style>
