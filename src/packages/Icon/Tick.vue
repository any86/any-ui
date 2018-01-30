<template>
    <svg v-on="$listeners" class="icon" style="" :viewBox="`0 0 ${size} ${size}`" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :size="size" :height="size">
        <line x1="10" y1="10" :x2="size-10" :y2="size-10" :stroke-width="(size-10)/20" />
        <line :x1="size-10" y1="10" x2="10" :y2="size-10" :stroke-width="(size-10)/20" />
    </svg>
</template>
<script>
export default {
    name: 'AtomIconClose',

    props: {
        size: {
            default: 40
        }
    }

}
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
line {
    stroke: $light;
}
</style>
