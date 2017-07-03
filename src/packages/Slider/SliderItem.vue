<template>
    <div class="component-slider-item">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Slider',

    props: {
        value: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {

        };
    },

    mounted() {
        this.$parent.count++;
    },

    methods: {

    },

    watch: {

    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
$height: .5rem;
.component-slider-item {
    position: relative;
    flex: 0 0 100%;
}

.transition {
    transition: all .3s;
}
</style>
