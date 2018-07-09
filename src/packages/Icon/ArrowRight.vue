<template>
    <svg v-on="$listeners" v-bind="$attrs" :viewBox="`0 0 40 40`" :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-arrow" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <polyline :stroke="color" points="15,8 27,20 15,32" stroke-width="3" stroke-linecap="round" fill="none"/>
    </svg>
</template>
<script>
export default {
    name: 'AtomIconArrowRight',

    props: {
        size: {
            default: 48,
        },

        color: {
            type: String,
            default: 'currentColor',
        },
    },
};
</script>