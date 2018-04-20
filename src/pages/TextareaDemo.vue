<template>
    <v-scroll-view>
        <v-textarea ref="test" @focus="focus" @blur="blur" v-model="content"/>
    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VTextarea from '@/packages/Textarea/Textarea';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'TextareaDemo',

    data() {
        return {
            content: 'hello vue !',
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
    },

    components: {
        VTextarea,
        VCell,
        VScrollView
    }
};
</script>
<style scoped lang="scss">

</style>
