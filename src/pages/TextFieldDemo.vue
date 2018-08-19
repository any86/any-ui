<template>
    <main>
        <h2 class="fill-left fill-top">TextField</h2>
        <div class="fill">
            <a-text-field v-model="text3"/>
        </div>
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
            text6: 'abc',
            isShowWarning: true,
            vaildates: [RULE_1, RULE_2, RULE_3, RULE_4, RULE_5, RULE_6, RULE_7],

            text7: '我有样式',
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
                callback({ isPass: 'nba' != this.text1, message: '服务端不通过!' });
            }, 1000);
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../scss/variables.scss';
</style>
