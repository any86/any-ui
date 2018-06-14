<template>
    <svg v-on="$listeners" v-bind="$attrs" :viewBox="`0 0 40 40`" :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-arrow" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <polyline points="12,8 28,20 12,32" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>
</template>
<script>
export default {
    name: 'AtomIconArrow',

    props: {
        size: {
            default: 48
        }
    }
};
</script>

<style scoped lang="scss">
@import '../../scss/variables.scss';

</style>
