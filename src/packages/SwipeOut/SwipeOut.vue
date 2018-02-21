<template>
    <section class="atom-swipe-out">

        <span class="atom-swipe-out__action-left">
            <slot name="left"></slot>
        </span>

        <span 
            ref="body"
            v-bind="$attrs"
            v-on="$listeners"
            :style="{transform: `translateX(${deltaX}px)`}"
            @touchstart="touchStart" 
            @touchmove="touchMove" 
            @touchend="touchEnd" 
            class="atom-swipe-out__body">
            <slot></slot>
            {{deltaX}}
        </span>
        <span class="atom-swipe-out__action-right">
            <slot name="right"></slot>
        </span>
    </section>
</template>
<script>
import { getWidth, getHeight } from '../../utils/dom';
export default {
    name: 'AtomSwipeOut',

    data(){
        return {
            startX: 0,
            deltaX: 0,
        };
    },

    mounted(){
        
    },

    methods: {
        touchStart(e){
            const point = e.touches[0];
            this.startX = point.pageX;
        },

        touchMove(e){
            const point = e.touches[0];
            this.deltaX = point.pageX - this.startX;

            // 范围限制
            this.deltaX = Math.max(this.deltaX, 0 - this.maxRightDistance);
            this.deltaX = Math.min(this.deltaX, this.maxLeftDistance);
        },

        touchEnd(e){

        },
        
    },

    computed: {
        maxRightDistance(){
            let maxRight = 0;
            this.$slots.right.forEach(item=>{
                let itemWidth = getWidth(item.elm);
                if(undefined !== itemWidth) {
                    maxRight+= itemWidth;
                }
            });
            return maxRight;
        },

        maxLeftDistance(){
            let maxLeft = 0;
            this.$slots.left.forEach(item=>{
                let itemWidth = getWidth(item.elm);
                if(undefined !== itemWidth) {
                    maxLeft+= itemWidth;
                }
            });
            return maxLeft;
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-swipe-out {
    position: relative;
    display: flex;
    align-items: center;
    &__body{
        position: relative;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 100%;
        display: flex;
        align-items: center;
        min-height: 44px;
        align-items: center;
        border-bottom:1px solid $lightest;
    }

    &__action-left{
        height: 100%;
        position: absolute;
        left: 0;
        top:0;
        transform: translateX(-100%);
        display: flex;
    }

    &__action-right{
        height: 100%;
        position: absolute;
        right: 0;
        top:0;
        transform: translateX(100%);
        display: flex;
    }
}
</style>
