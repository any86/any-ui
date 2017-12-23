<template>
    <section class="atom-group">
        <header v-if="title || $slots.header">
            <slot name="header"></slot>
            {{title}}
        </header>
        <slot></slot>
    </section>
</template>
<script>
export default {
    name: 'Group',

    props: {
        title: {}
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-group{
    background: $background;
    overflow: hidden;
    >header{
        padding:  $gutter;
        color:$darkest;
        border-bottom: 1px solid $lightest;
    }
}
</style>
