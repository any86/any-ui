<template>
    <main class="atom-view">
        <slot></slot>
    </main>
</template>
<script>
export default {
    name: 'View'
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-view {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
