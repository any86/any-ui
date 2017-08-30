<template>
    <i v-on="$listeners" :class="['iconfont', 'icon-' + value]"></i>
</template>
<script>
export default {
    name: 'Icon',

    props: {
        value: {
            type: String,
            required: true
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
</style>
