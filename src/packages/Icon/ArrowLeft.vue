<template>
    <arrow-right :size="size" :color="color" style="transform: rotate(180deg);"/>
</template>
<script>
import ArrowRight from './ArrowRight.vue'
export default {
    name: 'AtomIconArrowLeft',

    components: {ArrowRight},

    props: {
        size: {
            default: 48,
        },

        color: {
            type: String,
            default: 'currentColor',
        },
    },
};
</script>