<template>
    <svg v-on="$listeners" v-bind="$attrs" :viewBox="`0 0 40 40`" :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-warning" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <line x1="20" y1="3" x2="20" y2="22" :stroke-width="4" stroke-linecap="round"/>
        <circle cx="20" cy="33" r="3" stroke="none" stroke-width="2"/>
    </svg>
</template>
<script>
export default {
    name: 'AtomIconMinus',

    props: {
        size: {
            default: 48
        }
    }

}
</script>