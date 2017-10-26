<template>
    <div v-bind="$attrs" v-on="$listeners" class="atom-collapse__item">
        <header class="item__header" @click="toggle">
            <span :class="[`header__arrow--${isUnfolded ? 'open' : 'close'}`]" class="header__arrow"></span>
            <!-- 这只有vue2.4以上$attrs默认才是{} -->
            <slot name="header">{{$attrs.title}}</slot>
        </header>
        <div v-show="isUnfolded" class="item__body">
            <slot></slot>
        </div>
        </transition>
    </div>
</template>
<script>
import { getHeight } from '@/utils/dom';
export default {
    name: 'CollapseItem',

    props: {
        isOpen: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            index: 0,
            isUnfolded: false
        };
    },

    mounted() {
        this.index = this.$parent.count;
        this.$parent.count++;
        this.$parent.status.push(this.isOpen);
    },

    methods: {
        toggle() {
            this.isUnfolded = !this.isUnfolded;
            if (this.$parent.isAccordion) {
                this.$parent.status = this.$parent.status.map((isOpen, i) => {
                    return this.index == i ? this.isUnfolded : false;
                });
            } else {
                this.$parent.status = this.$parent.status.map((isOpen, i) => {
                    return this.index == i ? this.isUnfolded : isOpen;
                });
            }
            this.$emit('update:isOpen', this.isUnfolded);
            if (this.isUnfolded) {
                this.$emit('change', this.index);
            }
        }
    },

    watch: {
        isOpen: {
            immediate: true,
            handler(value) {
                this.isUnfolded = value;
            }
        },

        ['$parent.status'](value) {
            for (let k in value) {
                if (this.index == k) {
                    this.isUnfolded = value[k];
                    break;
                }
            }
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-collapse__item {
    position: relative;
    border-bottom: 1px solid $lighter;
    > .item__header {
        display: flex;
        padding: $gutter;
        height: 24px;
        line-height: 24px;
        box-sizing: content-box;
        .header__arrow {
            display: inline-block;
            background: url('../../assets/more_unfold.svg');
            background-size: 100%;
            width: 24px;
            height: 24px;
            margin-right: $gutter;
            transition: transform $duration;
            will-change: transform;
            &--open {
                transform: rotate(0);
            }
            &--close {
                transform: rotate(-90deg);
            }
        }
    }
    > .item__body {
        padding: 0 $gutter $gutter $gutter;
        overflow: hidden;
        line-height: 1.5;
    }
}
</style>
