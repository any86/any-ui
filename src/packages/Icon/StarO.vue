<template>
    <svg v-on="$listeners" v-bind="$attrs" viewBox="0 0 22 20" :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-star-o"
     version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g transform="translate(-2.000000, -3.000000)" stroke="#FF9500" fill="transparent">
                <path d="M18.8015723,21.9851792 L17.6935706,15.5250335 L22.3871411,10.949933 L15.9007861,10.0074104 L13,4.12977573 L10.0992139,10.0074104 L3.61285889,10.949933 L8.30642945,15.5250335 L7.19842774,21.9851792 L13,18.9351121 L18.8015723,21.9851792 Z"></path>
            </g>
    </svg>
</template>

<script>
export default {
    name: 'AtomIconStarO',

    props: {
        size: {
            default: 48
        }
    }
};
</script>
<style lang="scss">
@import '../../scss/variables.scss';
</style>
