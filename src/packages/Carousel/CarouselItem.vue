<template>
    <div v-if="isActive || isPrevious || isNext" class="component-carousel-item" :class="{active: isActive, previous: isPrevious, next: isNext, 'patch-offset': isOffset}">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'CarouselItem',

    props: {
        value: {
            type: [Number, String],
            default: 0
        }
    },

    data() {
        return {
            index: 0,
        };
    },

    mounted() {
        this.index = this.$parent.count;
        this.$parent.count++;
    },

    methods: {

    },

    computed: {
        isPrevious() {
            // 如果count == 2, 默认把第二页放在active页后面, active页通过offset偏移定位到当前位置, 防止只有2页的情况下next/previous指代不清
            if(2 < this.$parent.count) {
                return this.$parent.previousIndex == this.index;
            } else if (2 == this.$parent.count) {
                if(this.$parent.isMoveToRight) {
                    return this.$parent.previousIndex == this.index;
                } else {
                    return false;
                }
            }
        },

        isActive() {
            return this.$parent.activeIndex == this.index;
        },

        isNext() {
            return this.$parent.nextIndex == this.index;
        },

        isOffset() {
            // 专门针对count == 2 做的补丁
            return 2 == this.$parent.count && this.isActive && !this.$parent.isMoveToRight;
        }
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
.component-carousel-item {
    position: relative;
    flex: 0 0 100%;
    &.patch-offset {
        margin-left: 100%;
    }
    &.previous {
        order: -1;
    }
    &.active {
        order: 0;
    }
    &.next {
        order: 1;
    }
}
</style>
