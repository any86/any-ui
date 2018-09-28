<template>
    <main>
        <a-cell>
            <template slot="title">常规</template>
            <a-textarea 
                :maxlength="10"
                ref="test" 
                :autofocus="true" 
                @focus="focus" 
                @blur="blur" 
                @change-length="changeLength"
                v-model="content1">
                <span slot="append" class="fill-right-sm">
                    {{10 < length1 ? 0 : 10 - length1}} left
                </span>
            </a-textarea>
        </a-cell>

        <a-cell>
            <template slot="title">过滤字母</template>
            <a-textarea :filter-exp="exp" v-model="content2"/>
        </a-cell>

    </main>
</template>
<script>
export default {
    name: 'TextareaDemo',

    data() {
        return {
            exp: new RegExp('[a-zA-Z]', 'g'),
            length1: 0,
            content1: 'hello vue',
            content2: '过滤字母',
        };
    },

    methods: {
        changeLength(length) {
            this.length1 = length;
        },

        focus(e) {
            console.dir(e);
        },

        blur(e) {
            console.dir(e);
        },
    },
};
</script>
<style scoped lang="scss">
</style>
