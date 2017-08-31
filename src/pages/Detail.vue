<template>
    <component :is="activeComponent">
    </component>
</template>
<script>
export default {
    name: 'Detail',

    data() {
        return { activeComponent: 'Charm' };
    },

    components: {
        Ring: () => import('@/pages/Detail/Ring'),
        NameNecklace: () => import("@/pages/Detail/NameNecklace"),
        Necklace: () => import("@/pages/Detail/Necklace"),
        Charm: () => import("@/pages/Detail/Charm"),
        Bangle: () => import("@/pages/Detail/Bangle"), // 存在3中弹出处理
        NecklacePendant: () => import("@/pages/Detail/NecklacePendant"),
        
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
</style>
