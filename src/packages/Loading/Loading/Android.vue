<template functional>
    <svg width="36" height="36" viewBox="25 25 50 50" 
    :class="['atom-loading-android', `atom-loading-android--${props.theme}`]">
        <circle cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
    </svg>
</template>
<script>
export default {
    name: 'AtomLoadingAndroid',

    props: {
        theme: {
            type: String,
            default: 'primary'
        }
    }
};
</script>