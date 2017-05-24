<template>
    <div class="component-swiper-item" :class="{transition: isAnimate}" :style="{transform: 'translate3d('+translateX+'px,0,0)' ,width: width + 'px', height: height + 'px'}">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'SwiperItem',

    data() {
        return {
            index: -1,
            width: 0,
            height: 0
        };
    },

    computed: {
        translateX() {
            return (this.index - this.$parent.active) * this.width + this.$parent.touche.distance;
        },

        isAnimate() {
            if (0 == this.$parent.touche.status) {
                return true;
            }
        }
    },

    mounted() {
        const {
            width,
            height
        } = this.$parent.$el.getBoundingClientRect();
        // 初始化每个swiper的宽高
        this.width = width;
        this.height = height;

        this.index = this.$parent.count;
        this.$parent.count++;
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-swiper-item {
    position: absolute;
    top: 0;left:0;
    overflow: hidden;
    box-sizing: border-box;
    
    &.transition{transition:all .5s;}

}
</style>
