<template>
    <span class="component-carousel-item" :style="{width: `${width}px`}">
        <slot></slot>
    </span>
</template>
<script>
export default {
    name: 'CarouselItem',

    data() {
        return {
            index: -1,
        };
    },

    mounted() {
        this.index = this.$parent.count;
        this.$parent.count++;
    },

    methods: {

    },

    computed: {
        width() {
            return this.$parent.width;
        },

        isActive() {
            return this.index == this.$parent.activeIndex;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-carousel-item {
    position: relative;
    flex: 0 0 auto;
    // flex-shrink: 0;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
}
</style>
