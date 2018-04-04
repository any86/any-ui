<template>
    <span 
        v-ripple="true"
        :style="{ transform: `translateX(${activeX}px)`, transitionDuration: `${duration}ms`}" 
        :class="[`bg-${type}`]"
        class="atom-swipe-out-button">
        <slot></slot>
    </span>
</template>
<script>
export default {
    name: 'AtomSwipeOutButton',

    props: {
        type: {
            type: String,
            default: 'primary'
        }
    },

    computed: {
        activeX(){
            return this.$parent.activeX;
        },

        duration(){
            return this.$parent.duration;
        }
    }
};
</script>