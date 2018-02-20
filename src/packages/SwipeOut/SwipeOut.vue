<template>
    <section class="atom-swipe-out">
        <span class="atom-swipe-out__body">
            <slot></slot>
        </span>
        <span class="atom-swipe-out__right">
            <slot name="right"></slot>
        </span>
    </section>
</template>
<script>
export default {
    name: 'AtomSwipeOut'
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-swipe-out {
    position: relative;
    display: flex;

    &__body{
        position: relative;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 100%;
        background: $dark;
        display: block;
    }

    &__right{
        position: absolute;
        right: 0;
        top:0;
        transform: translateX(100%);
    }
}
</style>
