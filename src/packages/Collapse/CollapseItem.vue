<template>
    <div v-bind="$attrs" v-on="$listeners" :is-unfolded="isUnfolded" class="atom-collapse__item">
        <header @click="toggle" :class="{'item__header--line': hasLine}" class="item__header">
            <span :class="[`header__arrow--${isUnfolded ? 'open' : 'close'}`]" class="header__arrow"></span>
            <!-- 这只有vue2.4以上$attrs默认才是{} -->
            <slot name="header">{{$attrs.title}}</slot>
        </header>
        <div v-show="isUnfolded" :class="{'zoom-enter-active': hasAnimate}" class="item__body">
            <slot></slot>
        </div>

    </div>
</template>
<script>
import { getHeight } from '../../utils/dom';
export default {
    name: 'AtomCollapseItem',

    props: {
        isOpen: {
            type: Boolean,
            default: false
        },

        hasLine: {
            type: Boolean,
            default: false
        },

        hasAnimate: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            index: 0,
            isUnfolded: false
        };
    },

    mounted() {
        if (this.$isServer) return;
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
@import '../../scss/variables.scss';
.atom-collapse__item {
    position: relative;
    border-bottom: 1px solid $lighter;

    > .item__header {
        display: flex;
        padding: $gutter;
        height: 24px;
        line-height: 24px;
        box-sizing: content-box;
        font-size: $big;
        &--line {
            border-bottom: 1px solid $lightest;
        }
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
    .item__header--line + .item__body {
        padding: $gutter;
    }

    &:not([is-unfolded]) {
        .item__header--line {
            border-bottom: 0 none;
        }
    }
}
</style>
