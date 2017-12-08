<template>
    <div class="atom-group">
        <header v-if="title || $slots.header">
            <slot name="header"></slot>
            {{title}}
        </header>
        <slot></slot>
    </div>
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
    margin-top:$gutter;
    background: $background;
    
    >header{
        padding:  $gutter;
        color:$darkest;
        border-bottom: 1px solid $lightest;
    }
}
</style>
