<template>
    <div class="component-swiper-item" :class="{transition: isAnimate, active: isActive}" :style="{transform: 'translate3d('+translateX+'px,0,0)' ,width: width + 'px', height: height + 'px'}">
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
            // 右边界
            if(this.$parent.count - 1 == this.$parent.active) {
                // 如果: 当前index为0, 那么移动一个swiper宽度, 下一滑动显示
                if(0 == this.index) {
                    // 如果当前索引为0, 那么距离也为0
                    if(0 == this.$parent.active) {
                        return 0;
                    } else {
                        return this.width + this.$parent.touche.distance;
                    }
                } else {
                    return (this.index - this.$parent.active) * this.width + this.$parent.touche.distance;
                }
            } else {
                return (this.index - this.$parent.active) * this.width + this.$parent.touche.distance;
            }
        },

        isAnimate() {
            if (0 == this.$parent.touche.status) {
                return true;
            } else {
                return false;
            }
        },

        isActive(){
            return this.index == this.$parent.active;
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

.active{z-index:2;}
</style>
