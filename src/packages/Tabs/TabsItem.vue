<template>
    <span @click="select" :class="['component-tabs-item', index == $parent.active && 'active']"><slot></slot></span>
</template>
<script>
export default {
    name: 'TabsItem',
    
    data(){
        return {
            index: -1,
            width: -1,
        };
    },

    mounted(){
        this.index = this.$parent.count;
        this.$parent.count++;
        this.width = this.$el.scrollWidth + 1;
        this.$parent.itemWidth.push(this.width);
        this.$parent.filmWidth+= this.width;
    },

    methods: {
        select(){
            this.$parent.active = this.index;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-tabs-item {
    // 有剩余空间是否自动占满
    flex-grow:1;
    // 空间不够是否缩小
    flex-shrink:0;
    // 默认尺寸
    flex-basis:auto;
    
    display: block;
    box-sizing: border-box;
    padding: 2*$gutter 3*$gutter;
    text-align: center;
    color: $darkest;
    font-size: $normal;
    &.active {
        color: $base;
    }
}
</style>
