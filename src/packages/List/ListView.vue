<template>
    <ul class="component-list">
        <slot></slot>
    </ul>
</template>
<script>
export default {
    name: 'List',

    props: {
        value: {}
    },

    mounted() {},

    data() {
        return {}
    },

    methods: {},

    components: {}
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-list {
   position: relative;
   li:last-child{border-bottom: none;}
}
</style>
