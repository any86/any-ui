<template>
    <span class="atom-stepper">
        <template>
            <i :class="['btn', 'btn-minus', min == value && 'disabled']" value="minus" @click="minus"></i>
            <span class="content" @click="click">{{value}}</span>
            <i :class="['btn', 'btn-plus', max == value && 'disabled']" value="plus" @click="plus"></i>
        </template>
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
            default: 99
        },

        step: {
            type: Number
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
                this.$emit('input', number - 1);
            } else {
                this.$emit('reachMin');
            }
        },

        plus() {
            const number = parseInt(this.value);
            if (this.max > number) {
                this.$emit('input', number + 1);
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
    position: relative;
    display: inline-block;
    border: 1px solid $lighter;
    height: $height;
    overflow: hidden;
    > .btn {
        display: inline-block;
        height: $height;
        line-height: $height;
        width: $height;
        color: $darker;
        font-size: $bigger;
        text-align: center;
        &.disabled {
            border-color: $disabled;
            color: $disabled;
        }
        &:not(.disabled):active {
            color: $base;
        }
        &.btn-minus {
            background: url(../../assets/add.svg) center center no-repeat;
            background-size: 60%;
            border-right: 1px solid $lighter;
        }
        &.btn-plus {
            border-left: 1px solid $lighter;
        }
    }
    > .content {
        display: inline-block;
        padding: 0 $gutter;
        min-width: $height * 1.4;
        color: $darkest;
        font-size: $bigger;
        text-align: center;
        position: relative;
        &.disabled {
            color: $disabled;
        }
    }
}
</style>
