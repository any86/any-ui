<template>
    <div class="atom-collapse">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Collapse',

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
@import '../../scss/theme.scss';
.atom-collapse {
    position: relative;
}
</style>
