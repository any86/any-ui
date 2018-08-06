<template>
    <svg  
        :style="{width: `${size}px`, height: `${size}px`}"
        v-on="$listeners" 
        v-bind="$attrs" 
        viewBox="0 0 27 27" 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink"
        class="atom-icon-plus">
        <g  :stroke="color" stroke-width="1" :fill="color" fill-rule="evenodd">
            <rect x="4" y="12" width="19" height="3" rx="1.5"></rect>
        </g>
    </svg>
</template>
<script>
export default {
    name: 'AtomIconMinus',

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