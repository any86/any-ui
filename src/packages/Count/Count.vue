<template>
    <span :class="{'atom-count--disabled': isDisabled}" class="atom-count">
        <a-icon value="minus" size="32" class="atom-count__btn atom-count__btn-minus" :class="{'atom-count__btn--disabled': min == value}" @click="minus"/>
        
        <span class="atom-count__content" v-on="$listeners">{{value}}</span>

        <a-icon value="plus" size="32" class="atom-count__btn atom-count__btn-plus" :class="{'atom-count__btn--disabled': max == value}" @click="plus"/>
    </span>
</template>
<script>
import AIcon from '../Icon'
export default {
    name: 'AtomCount',

    props: {
        hasRipple: {
            type: Boolean,
            default: true
        },

        isDisabled: {
            type: Boolean,
            default: false
        },

        min: {
            type: Number,
            default: 1
        },

        max: {
            type: Number,
            default: 10
        },

        step: {
            type: Number,
            default: 1
        },

        value: {
            type: [Number, String],
            required: true
        }
    },

    methods: {
        minus() {
            const number = parseInt(this.value);
            if (this.min < number) {
                this.$emit('input', Math.max(this.min, number - this.step));
            } else {
                this.$emit('reachMin');
            }
        },

        plus() {
            const number = parseInt(this.value);
            if (this.max > number) {
                this.$emit('input', Math.min(this.max, number + this.step));
            } else {
                this.$emit('reachMax');
            }
        }
    },

    components: {AIcon}
};
</script>
<style scoped lang=scss>
@import '../../scss/variables.scss';
.atom-count {
    box-sizing: content-box;
    position: relative;
    display: inline-flex;
    border: 1px solid $lighter;
    height: $component_count_height;
    background: $background;

    &--disabled {
        background: $lightest;
        pointer-events: none;
        &__btn {
            background: $lightest;
        }
    }

    &__btn {
        display: block;
        height: $component_count_height;
        line-height: $component_count_height;
        width: $component_count_height;
        color: $darker;
        text-align: center;
        transition: background $duration;
        &--disabled {
            background-color: $lightest;
        }
    }
    &__btn-minus {
        border-right: 1px solid $lighter;
    }
    &__btn-plus {
        border-left: 1px solid $lighter;
    }

    &__content {
        display: inline-block;
        position: relative;
        transition: transform $duration;
        min-width: $component_count_height * 1.25;
        color: $darkest;
        text-align: center;
        line-height: $component_count_height;
        &.disabled {
            color: $disabled;
        }
    }
}
</style>
