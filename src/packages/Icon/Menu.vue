<template>
    <svg v-on="$listeners" v-bind="$attrs" :viewBox="`0 0 40 40`" :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-menu" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g :stroke="color">
            <line x1="6" y1="10" x2="34" y2="10" :stroke-width="3" stroke-linecap="round"/>
            <line x1="6" y1="20" x2="34" y2="20" :stroke-width="3" stroke-linecap="round"/>
            <line x1="6" y1="30" x2="34" y2="30" :stroke-width="3" stroke-linecap="round"/>
        </g>
    </svg>
</template>
<script>
export default {
    name: 'AtomIconMenu',

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