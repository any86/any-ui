<template>
    <div class="atom-collapse">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'AtomCollapse',

    props: {
        isAccordion: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            count: 0,
            status: []
        };
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-collapse {
    position: relative;
}
</style>
