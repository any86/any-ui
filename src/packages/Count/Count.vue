<template>
    <span :class="{'atom-count--disabled': isDisabled}" class="atom-count">
        <i v-ripple="!isDisabled && hasRipple && min != value" :class="['atom-count__btn', 'atom-count__btn-minus', min == value && 'atom-count__btn--disabled']" @click="minus"></i>
        <span v-ripple="{disabled: true}" class="atom-count__content" v-on="$listeners">{{value - !isDisabled && hasRipple && max != value}}</span>
        <i v-ripple="!isDisabled && hasRipple && max != value" :class="['atom-count__btn', 'atom-count__btn-plus', max == value && 'atom-count__btn--disabled']" @click="plus"></i>
    </span>
</template>
<script>
export default {
    name: 'Count',

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
    }
};
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
$height: 0.5rem;
.atom-count {
    box-sizing: content-box;
    position: relative;
    display: inline-flex;
    border: 1px solid $lighter;
    height: $height;
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
        height: $height;
        line-height: $height;
        width: $height;
        color: $darker;
        text-align: center;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 60%;
        &--disabled {
            background-color: $lightest;
        }
    }
    &__btn-minus {
        background-image: url('../../assets/subtract.svg');
        border-right: 1px solid $lighter;
    }
    &__btn-plus {
        background-image: url('../../assets/add.svg');
        border-left: 1px solid $lighter;
    }

    &__content {
        display: inline-block;
        position: relative;
        transition: transform $duration;
        min-width: $height * 1.25;
        color: $darkest;
        text-align: center;
        line-height: $height;
        &.disabled {
            color: $disabled;
        }
    }
}
</style>
