<template>
    <svg v-on="$listeners" v-bind="$attrs" :viewBox="`0 0 40 40`" :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-tick" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <polyline fill="transparent" :stroke="color" points="8,19 16,28 34,12" stroke-width="3" stroke-linecap="round"/>
    </svg>
</template>
<script>
export default {
    name: 'AtomIconTick',

    props: {
        size: {
            default: 48
        },

        color: {
            type: String,
            default: 'currentColor'
        }
    }
};
</script>