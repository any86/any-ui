<template>
    <span :style="{ transform: `translateX(${deltaX}px)`}" class="atom-swipe-out-button">
        <slot></slot>
    </span>
</template>
<script>
export default {
    name: 'AtomSwipeOutButton',

    data(){
        return {width: 0}
    },

    mounted(){
        this.width = this.$el.scrollWidth;
    },

    computed: {
        deltaX(){
            return this.$parent.deltaX;
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-swipe-out-button {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left:$gutter;
    padding-right:$gutter;

    color:$sub;
}
</style>
