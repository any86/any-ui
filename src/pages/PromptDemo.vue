<template>
    <main class="fill">
        <a-button :is-ghost="true" :is-block="true" @click="handle" class="gutter-top">
            Prompt
        </a-button>
    </main>
</template>
<script>
import { AButton } from '@/packages'

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
        AButton
    }
};
</script>
<style scoped lang="scss">

</style>
