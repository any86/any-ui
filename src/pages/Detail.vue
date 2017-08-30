<template>
    <component :is="activeComponent">
    </component>
</template>
<script>
export default {
    name: 'Detail',

    data() {
        return { activeComponent: 'NecklacePendant' };
    },

    components: {
        Ring: () => import('@/pages/Detail/Ring'),
        NameNecklace: () => import("@/pages/Detail/NameNecklace"),
        Necklace: () => import("@/pages/Detail/Necklace"),
        Charm: () => import("@/pages/Detail/Charm"),
        Bangle: () => import("@/pages/Detail/Bangle"),
        NecklacePendant: () => import("@/pages/Detail/NecklacePendant"),
        
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
</style>
