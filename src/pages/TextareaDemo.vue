<template>
    <main>
        <a-cell>
            <template slot="prepend">常规</template>
            <a-textarea 
                :maxlength="10"
                ref="test" 
                :autofocus="true" 
                @focus="focus" 
                @blur="blur" 
                v-model="content1">
                <span slot="append" class="fill-right-sm">
                    {{10 - content1.length}} left
                </span>
            </a-textarea>
        </a-cell>

        <a-cell>
            <template slot="prepend">过滤字母</template>
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
            content1: 'vue atom',
            content2: '过滤字母',
        };
    },

    methods: {
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
