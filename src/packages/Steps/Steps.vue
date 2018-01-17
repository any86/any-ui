<template>
    <div class="component-steps">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'AtomSteps',

    props: {
        value: {
            type: Number,
            default: 0
        }
    },

    data(){
        return {count: 0};
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-steps {
    position: relative;
}
</style>
