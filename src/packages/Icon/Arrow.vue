<template>
    <svg v-on="$listeners" v-bind="$attrs" :viewBox="`0 0 40 40`" :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-add" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <polyline points="10,5 30,20 10,35" stroke-width="2" stroke-linecap="round"/>
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
polyline{fill: transparent;stroke:$dark;}
</style>
