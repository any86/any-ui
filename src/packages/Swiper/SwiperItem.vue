<template>
    <div class="component-swiper-item" :style="{transform: `translate3d(${translateX}px,0,0)` ,width: width + 'px', height: height + 'px'}">
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

    methods: {
        findIndex() {
            var pActive = this.$parent.active;
            var pCount = this.$parent.count;
            var pLast = pCount - 1;
            //  激活的是第一张
            if (0 == pActive) {
                // 如果是最后一张, 放到第一张前面
                if (pLast == this.index) {
                    return -1;
                } else {
                    return this.index;
                }
                // 激活的是最后一张    
            } else if (pLast == pActive) {
                if (0 == this.index) {
                    return 1;
                } else {
                    return 0 - (pLast - this.index);
                }
            } else {
                return (this.index - pActive);
            }
        }
    },

    computed: {
        translateX() {
            if (this.$parent.count - 1 == this.$parent.active) {
                if(0 == this.index) {
                    return this.$parent.count * this.width;
                }
            } else {
                return this.index * this.width;
            }
        },

        isActive() {
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
    top: 0;
    left: 0;
    overflow: hidden;
    box-sizing: border-box;
    &.transition {
        transition: all .5s;
    }
}
</style>
