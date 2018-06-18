<template functional>
    <div :class="['atom-loading-three-dots', `atom-loading-three-dots--${props.theme}`]">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
</template>
<script>
export default {
    name: 'AtomLoadingThreeDots',

    props: {
        theme: {
            type: String,
            default: 'primary'
        }
    }
};
</script>