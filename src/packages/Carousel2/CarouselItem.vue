<template>
    <div v-if="isActive || isPrevious || isNext" class="component-carousel-item" :class="{active: isActive, previous: isPrevious, next: isNext}">
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
            if(this.$parent.isMoveToRight) {
                return this.$parent.previousIndex == this.index;
            } else {
                return this.$parent.isMoveToRight;
            }
            
        },

        isActive() {
            return this.$parent.activeIndex == this.index;
        },

        isNext() {
            if(this.$parent.isMoveToLeft) {
                return this.$parent.nextIndex == this.index;
            } else {
                return this.$parent.isMoveToLeft;
            }
        }
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
.component-carousel-item {
    position: relative;
    flex: 0 0 100%;
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
