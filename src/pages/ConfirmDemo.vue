<template>
    <main class="fill">
        <a-button :is-ghost="true" :is-block="true" type="primary" @click="$confirm('喜欢atom吗?')" class="gutter-top">
            打开
        </a-button>
    </main>
</template>
<script>
import { AButton } from '@/packages'

export default {
    name: 'ConfrimDemo',

    components: {
        AButton,
    }
};
</script>
<style scoped lang="scss">
</style>
