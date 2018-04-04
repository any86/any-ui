<template>
    <a-scroll-view>
        <a-textarea v-model="content"/>
    </a-scroll-view>
</template>
<script>
import { AScrollView, ATextarea } from '@/packages'

export default {
    name: 'TextareaDemo',

    data() {
        return {
            content: 'hello vue !',
        };
    },

    components: {
        AScrollView,
        ATextarea
    }
};
</script>
<style scoped lang="scss">

</style>
