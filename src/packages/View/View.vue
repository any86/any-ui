<template>
    <main class="atom-view">
        <slot></slot>
    </main>
</template>
<script>
export default {
    name: 'AtView'
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-view {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
