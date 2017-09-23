<template>
    <div class="component-group">
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
.component-group{
    padding:$gutter;
    >header{
        color:$darkest;
        border-bottom: 1px solid $lightest;
        min-height: .8rem;
        line-height: .8rem;
    }
}
</style>
