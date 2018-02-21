<template>
    <span :style="{width: `${width}px`}" class="atom-swipe-out-button">
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
        this.$nextTick(()=>{
            this.width = this.$el.scrollWidth;
        });
        
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-swipe-out-button {
    position: relative;
    padding:$gutter;    
    display: flex;
}
</style>
