<template>
    <div class="component-steps">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Steps',

    props: {

    },

    data(){
        return {count: 0};
    },

    mounted() {

    },

    destroyed() {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-steps {
    position: relative;
}
</style>
