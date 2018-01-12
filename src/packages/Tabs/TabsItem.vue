<template>
    <div @click="select" :class="['atom-tabs__item', index == $parent.$parent.activeIndex && 'atom-tabs__item--active']">
        <slot></slot>
    </div>
</template>
<script>
import { getWidth } from '@/utils/dom';
export default {
    name: 'TabsItem',

    data() {
        return {
            index: -1 // 不能为0, 防止初始化阶段都为0产生全部高亮
        };
    },

    mounted() {
        const width = getWidth(this.$el);
        this.index = this.$parent.$parent.count;
        this.$parent.$parent.count++;
        this.$parent.$parent.itemWidthList.push(width);
        this.$parent.$parent.countWidth += width;
    },

    methods: {
        select() {
            this.$parent.$parent.activeIndex = this.index;
            this.$parent.$parent.$emit('input', this.index);
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
$height:55px;
.atom-tabs__item {
    // 有剩余空间是否自动占满
    position: relative;
    flex-grow: 1; // 空间不够是否缩小
    flex-shrink: 0; // 默认尺寸
    flex-basis: auto;
    box-sizing: border-box;
    padding: $gutter;
    text-align: center;
    color: $darkest;
    display: block;
    // border-bottom: 1px solid $lightest;
    &--active {
        color: $base;
    }
}
</style>
