<template>
    <a-scroll-view>
        <a-cell>
            <template slot="title">常规</template>
            <a-textarea ref="test" :autofocus="true" @focus="focus" @blur="blur" v-model="content1"/>
        </a-cell>

        <a-cell>
            <template slot="title">过滤字母</template>
            <a-textarea :filter-exp="exp" v-model="content2"/>
        </a-cell>

    </a-scroll-view>
</template>
<script>
export default {
    name: 'TextareaDemo',

    data() {
        return {
            exp: new RegExp('[a-zA-Z]', 'g'),
            content1: 'hello vue',
            content2: '过滤字母',
            
        };
    },

    mounted(){ 
        console.dir(this.$refs.test.$refs.textarea);
    },

    methods: {
        focus(e){
            console.dir(e);
        },

        blur(e){
            console.dir(e);
        },
    }
};
</script>
<style scoped lang="scss">

</style>
