<template>
    <svg v-on="$listeners" v-bind="$attrs" :viewBox="`0 0 40 40`" :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-menu" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <line x1="8" y1="12" x2="32" y2="12" :stroke-width="2" />
        <line x1="8" y1="20" x2="32" y2="20" :stroke-width="2"/>
        <line x1="8" y1="28" x2="32" y2="28" :stroke-width="2"/>
    </svg>
</template>
<script>
export default {
    name: 'AtomIconMenu',

    props: {
        size: {
            default: 48
        }
    }

}
</script>