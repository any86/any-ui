<template>
    <main class="fill">
        <v-button :is-ghost="true" :is-block="true" @click="handle" class="gutter-top">
            Prompt
        </v-button>
    </main>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VButton from '@/packages/Button/Button';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'PromptDemo',

    data() {
        return {};
    },

    methods: {
        handle() {
            this.$prompt('给atom留言', {
                onOk(text) {
                    alert(text);
                }
            });
        }
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
