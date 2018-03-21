<template functional>
    <div :class="['atom-three-dots', `atom-three-dots--${props.type}`]">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
</template>
<script>
export default {
    name: 'AtomSpinnerThreeDots',

    props: {
        type: {
            type: String,
            default: 'primary'
        }
    }
};
</script>