<template>
    <span @click="setActive" class="atom-segment-control__item" :class="{'atom-segment-control__item--active': $parent.value == index}">
        <slot></slot>
    </span>
</template>
<script>
export default {
    name: 'AtomSegmentItem',

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