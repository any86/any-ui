<template>
    <main class="fill">
        <v-button :is-ghost="true" :is-block="true" type="primary" @click="$confirm('喜欢atom吗?')" class="gutter-top">
            打开
        </v-button>
    </main>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VButton from '@/packages/Button/Button';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'ConfrimDemo',

    data() {
        return {

        };
    },

    components: {
        VButton,
        VCell,
        VScrollView
    }
};
</script>
<style scoped lang="scss">
</style>
