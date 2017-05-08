<template>
    <transition>
        <ul class="component-menu">
            <slot></slot>
        </ul>
    </transition>
</template>
<script>
export default {
    name: 'Menu',
}
</script>

<style lang="scss" scoped>
@import '../scss/theme.scss';
.component-menu{
    display: inline-block;
    border-radius: $borderRadius;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, .1), -1px -2px 3px rgba(0, 0, 0, .1);
    padding: 5px 0;
    li{
        padding:5px 15px;
        &:hover{cursor: pointer;background: $light;color: $primary;}
    }
}
</style>
