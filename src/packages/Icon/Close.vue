<template>
    <svg v-on="$listeners" v-bind="$attrs" :viewBox="`0 0 40 40`" :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-close" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <line x1="5" y1="5" x2="35" y2="35" :stroke-width="2" />
        <line x1="35" y1="5" x2="5" :y2="35" :stroke-width="2"/>
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