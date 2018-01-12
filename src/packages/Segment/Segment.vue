<template>
    <div class="atom-segment" role="tablist" v-on="$listeners">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Segment',

    props: {
        value: {
            type: Number,
            default: 0
        }
    },

    data() {
        return { count: 0 };
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
$height: 0.3rem;
.atom-segment {
    position: relative;
    display: table;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    border: 1px solid $base;
    border-radius: $borderRadius;
}
</style>
