<template>
    <svg viewBox="25 25 50 50" class="atom-spinner-android">
        <circle cx="50" cy="50" r="20" fill="none" :style="{stroke: color}" stroke-width="5" stroke-miterlimit="10"></circle>
    </svg>
</template>
<script>
export default {
    name: 'SpinnerAndroid',

    props: {
        color: {
            type: String
        }
    }
};
</script>

<style scoped lang=scss>
@import '../../scss/theme.scss';
.atom-spinner-android{
    circle {
        display: inline-block;
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        /* 由于scoped会给属性改名, 如果写2个动画名, vue不会给第二个动画名改名 */
        /* animation: color 6s ease-in-out infinite, dash 1.5s ease-in-out infinite;  */
        animation: dash 1.5s ease-in-out infinite;
        stroke-linecap: round;
        stroke: $primary;
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }

        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35;
            /* stroke: $success; */
        }

        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124;
            /* stroke: $warning; */
        }
    }
}
</style>
