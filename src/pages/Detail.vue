<template>
    <component :is="activeComponent">
    </component>
</template>
<script>
export default {
    name: 'Detail',

    data() {
        return { activeComponent: 'Bangle' };
    },

    components: {
        Ring: () => import('@/pages/Detail/Ring'),
        NameNecklace: () => import("@/pages/Detail/NameNecklace"),
        Necklace: () => import("@/pages/Detail/Necklace"),
        Charm: () => import("@/pages/Detail/Charm"),
        Bangle: () => import("@/pages/Detail/Bangle"),
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
</style>
