<template>
    <main>
        <a-cell>
            <template slot="prepend">学 校 *</template>
            <a-input ref="inputSchool" required :rules="vaildates" placeholder="请输入学校" v-model="text1"/>
        </a-cell>

        <a-cell>
            <template slot="prepend">手 机</template>
            <a-input :is-select-all="true" maxlength="13" v-model="text3" type="phone" />
        </a-cell>

        <a-cell>
            <template slot="prepend">流 水 号</template>
            <a-input maxlength="13" v-model="text4" type="number" />
        </a-cell>
        
        <a-cell>
            <template slot="prepend">银行卡流水</template>
            <a-input maxlength="14" v-model="text2" type="bankCode" />
        </a-cell>
        
        <a-cell>
            <template slot="prepend">仅能输入字母</template>
            <a-input maxlength="13" v-model="text5" type="letter" />
        </a-cell>
        
        <a-cell>
            <template slot="prepend">过滤非字母</template>
            <a-input :filter="/[^a-zA-Z]/g" v-model="text6"/>
        </a-cell>

        <div class="fill">
            <a-button @click="validate">验证学校</a-button>
        </div>
        
    </main>
</template>
<script>
export default {
    name: 'InputDemo',

    data() {
        return {
            text1: '',
            text2: '0000 0000 0000 0000',
            text3: '133123456789',
            text4: '01234567',
            text5: 'abc',
            text6: 'abc',
            isShowWarning: true,
            vaildates: [{ required: true, message: '学校不能为空!' }, { trigger: 'keyup', minLength: 2, message: '至少2个字符!' }, { trigger: 'keyup', maxLength: 3, message: '最多3个字符!' }, { trigger: 'keyup', message: '值不能等于100', validator: this.isSame }, { message: '值不能等于200', asyncValidator: this.isSame200 }, { test: /a/, message: '必须包含a!' }, { test: /b/, message: '必须包含b!' }],
        };
    },

    methods: {
        validate() {
            // this.$loading();
            this.$refs.inputSchool
                .validate()
                .then(() => {
                    this.$toast(`验证通过!`, { type: 'success'});
                    // this.$loading.close();
                })
                .catch(error => {
                    this.$toast(`验证结果: ${error}`);
                });
        },

        isSame() {
            return 100 != this.text1;
        },

        isSame200(callback) {
            setTimeout(() => {
                callback(200 != this.text1);
            }, 1000);
        },
    },
};
</script>
<style scoped lang="scss">
</style>
