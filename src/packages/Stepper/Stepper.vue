<template>
    <span class="atom-stepper">
        <i v-ripple :class="['atom-stepper__btn', 'atom-stepper__btn-minus', min == value && 'disabled']" @click="minus"></i>
        <span class="atom-stepper__content" @click="click">{{value}}</span>
        <i v-ripple :class="['atom-stepper__btn', 'atom-stepper__btn-plus', max == value && 'disabled']"  @click="plus"></i>
    </span>
</template>
<script>
export default {
    name: 'Stepper',

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        min: {
            type: Number,
            default: 1
        },

        max: {
            type: Number,
            default: 100
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
        click() {
            this.$emit('click');
        },

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
                this.$emit('input',  Math.min(this.max, number + this.step));
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
.atom-stepper {
    box-sizing: content-box;
    position: relative;
    display: inline-flex;
    border: 1px solid $lighter;
    height: $height;
    &__btn {
        display: block;
        height: $height;
        line-height: $height;
        width: $height;
        color: $darker;
        text-align: center;
    }
    &__btn-minus {
        background: url('../../assets/subtract.svg') center center no-repeat;
        background-size: 60%;
        border-right: 1px solid $lighter;
    }
    &__btn-plus {
        background: url('../../assets/add.svg') center center no-repeat;
        background-size: 60%;
        border-left: 1px solid $lighter;
    }

    &__content {
        display: inline-block;
        position: relative;
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
