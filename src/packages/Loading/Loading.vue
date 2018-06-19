<template>
    <component :is="name" :type="theme"/>
</template>
<script>
import Android from './Loading/Android';
import Ripple from './Loading/Ripple.vue';
import ThreeDots from './Loading/ThreeDots.vue';
export default {
    name: 'AtomLoading',

    components: {
        Android,
        Ripple,
        ThreeDots
    },

    props: {
        name: {
            type: String,
            default: 'Android'
        },

        theme: {
            type: String,
            default: 'light'
        }
    }
};
</script>