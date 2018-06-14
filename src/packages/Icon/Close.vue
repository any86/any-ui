<template>
    <svg v-on="$listeners" v-bind="$attrs" :viewBox="`0 0 40 40`" :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-close" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <line x1="8" y1="8" x2="32" y2="32" :stroke-width="2" />
        <line x1="32" y1="8" x2="8" y2="32" :stroke-width="2"/>
    </svg>
</template>
<script>
export default {
    name: 'AtomIconClose',

    props: {
        size: {
            default: 48
        }
    }

}
</script>