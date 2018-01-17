<template>
    <span @click="setActive" class="atom-segment-control__item" :class="{'atom-segment-control__item--active': $parent.value == index}">
        <slot></slot>
    </span>
</template>
<script>
export default {
    name: 'AtSegmentItem',

    data() {
        return { index: 0 };
    },

    mounted() {
        this.index = this.$parent.count;
        this.$parent.count++;
    },

    methods: {
        setActive() {
            this.$parent.activeWidth = this.$el.scrollWidth;
            this.$parent.$emit('input', this.index);
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-segment-control__item {
    position: relative;
    z-index: 2;
    display: table-cell;
    text-align: center;
    padding: $gutter / 3 $gutter;
    color: $base;
    border-right: 1px solid $base;
    &:last-child {
        border-right: none;
    }
    &--active {
        transition: all 200ms;
        background: $base;
        color: $sub;
    }
}
</style>
