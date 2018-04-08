<template>
    <div @click="select" :class="['atom-tabs__item', index == $parent.$parent.activeIndex && 'atom-tabs__item--active']">
        <slot></slot>
    </div>
</template>
<script>
import { getWidth } from '../../utils/dom';
export default {
    name: 'AtomTabsItem',

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