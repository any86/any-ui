<template functional>
    <svg width="36" height="36" viewBox="0 0 50 50" 
    :class="['atom-loading-android', '' !== props.type && `text-${props.type}`]">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10"></circle>
    </svg>
</template>
<script>
export default {
    name: 'AtomLoadingAndroid',

    props: {
        type: {
            type: String,
            default: '',
        },
    },
};
</script>