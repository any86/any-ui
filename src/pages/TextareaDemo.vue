<template>
    <v-scroll-view>
        <v-textarea v-model="content"/>

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

    methods: {},

    components: {
        VTextarea,
        VCell,
        VScrollView
    }
};
</script>
<style scoped lang="scss">

</style>
