<template>
    <div class="atom-group">
        <header v-if="$slots.header">
            <slot name="header"></slot>
        </header>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Group',

    props: {
        value: {}
    },

    data() {
        return {
        };
    },

    mounted() {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-group{
    margin-top:$gutter/2;
    background: $background;
    >header{
        font-size: $big;
        padding: $gutter/2 $gutter;
        color:$darkest;
        border-bottom: 1px solid $lightest;
    }
}
</style>
