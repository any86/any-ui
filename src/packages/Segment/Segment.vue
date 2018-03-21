<template>
    <div class="atom-segment" role="tablist" v-on="$listeners">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'AtomSegment',

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