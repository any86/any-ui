<template>
    <component :is="name" :type="type"/>
</template>
<script>
import Android from './Core/Android';
import Ripple from './Core/Ripple.vue';
import ThreeDots from './Core/ThreeDots.vue';
export default {
    name: 'AtomLoading',

    components: {
        Android,
        Ripple,
        ThreeDots,
    },

    props: {
        name: {
            type: String,
            default: 'Android',
        },

        type: {
            type: String,
            default: 'primary',
        },
    },
};
</script>