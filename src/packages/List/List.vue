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

    methods: {}

}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-list {
   position: relative;
   // border-color: $lightest;
   // border-style: solid;
   // border-width: 1px 0 1px 0;
   >li:last-child{border-bottom: none;}
}
</style>
