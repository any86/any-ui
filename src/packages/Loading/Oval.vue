<template>
    <svg width="100%" height="100%" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" :class="[isDark ? 'dark': 'light']">
        <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
                <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
                </path>
            </g>
        </g>
    </svg>
</template>
<script>
export default {
    name: 'LoadingOval',

    props: {
        isDark: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
svg.dark {
    stroke: $dark;
}

svg.light {
    stroke: $lightest;
}
</style>
