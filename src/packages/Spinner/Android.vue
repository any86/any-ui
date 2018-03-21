<template>
    <svg width="36" height="36" viewBox="25 25 50 50" class="atom-spinner-android">
        <circle cx="50" cy="50" r="20" fill="none" :style="{stroke: color}" stroke-width="5" stroke-miterlimit="10"></circle>
    </svg>
</template>
<script>
export default {
    name: 'AtomSpinnerAndroid',

    props: {
        color: {
            type: String
        }
    }
};
</script>