<template>
    <div class="component-swiper-item" :class="{transition: isAnimate}" :style="{transform: 'translate3d(' + translateX + 'px, 0, 0)'}">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'SwiperItem',

    props: {

    },

    data() {
        return {
            index: 0,
            width: 0
        };
    },

    methods: {

    },

    computed: {
        translateX(){
            return (this.index - this.$parent.active) * this.width + this.$parent.touche.distance;
        },

        isAnimate(){
            if(0 == this.$parent.touche.status) {
                return true;
            }
        }
    },

    mounted() {
        this.width = this.$el.offsetWidth;
        this.index = this.$parent.count;
        this.$parent.count++;
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
.component-swiper-item {
    position: absolute;top:0;left:0;
    width: 100%;

    img {
        width: 100%;
        display: block;
    }
}

.transition{transition:all 1s ease;}
</style>
