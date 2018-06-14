<template>
    <svg  v-on="$listeners" v-bind="$attrs" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-star">
        <path d="M13,4.12977573 L10.0992139,10.0074104 L3.61285889,10.949933 L8.30642945,15.5250335 L7.19842774,21.9851792 L13,18.9351121 " :fill="0 === status? 'none' : '#FF9500'" stroke="#FF9500"></path>

        <path d="M13,4.12977573  L15.9007861,10.0074104 L22.3871411,10.949933 L17.6935706,15.5250335 L18.8015723,21.9851792 L13,18.9351121" :fill="1 > status? 'none' : '#FF9500'" stroke="#FF9500"></path>
    </svg>
</template>

<script>
export default {
    name: 'AtomIconStar',

    props: {
        size: {
            default: 48
        },

        status: {
            type: Number,
            default: 1
        }
    }
};
</script>