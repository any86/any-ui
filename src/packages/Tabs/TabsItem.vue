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
        this.width = this.$el.offsetWidth + 1;
        this.$parent.itemWidth.push(this.width);
        this.$parent.width+= this.width;
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
$height: 30px;
.component-tabs-item {
    float: left;
    display: block;
    padding: 2*$gutter 4*$gutter;
    text-align: center;
    color: $darkest;
    font-size: $normal;
    &.active {
        color: $base;
    }
}
</style>
