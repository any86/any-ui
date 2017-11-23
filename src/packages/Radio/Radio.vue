<template>
    <!-- radio改为圆形, 为了区别checkbox-->
    <label :class="{'atom-radio--reverse': isReverse}" class="atom-radio">
        <span v-if="!!$slots.default" class="atom-radio__title">
            <slot></slot>
        </span>
        <input :class="{checked: isChecked}" :disabled="disabled" :value="value" :checked="isChecked" @change="change" @click.stop="()=>{}" type="radio">
        <span class="atom-radio__appearance"></span>
    </label>
</template>
<script>
export default {
    name: 'Radio',

    model: {
        prop: 'referenceValue',
        event: 'change'
    },

    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        // 外部参考值
        // checked: referenceValue == value
        referenceValue: {
            required: true
        },

        value: {
            required: true
        },

        isReverse: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        change() {
            if (!this.disabled) {
                this.$emit('change', this.value);
            }
        }
    },

    computed: {
        isChecked() {
            return this.value == this.referenceValue;
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$size: 0.5rem;
label.atom-radio {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    &--reverse {
        .atom-radio__title {
            order: 1;
            margin-left: $gutter;
        }
    }

    > .atom-radio__title {
        flex: 1;
        font-size: $normal;
        &.active {
            color: $base;
        }
    }

    > input {
        & + .atom-radio__appearance {
            display: flex;
            border: 1px solid $base;
            width: $size;
            height: $size;
            border-radius: 100%;
            &:after {
                content: ' ';
                display: none;
                animation: zoom-in 500ms;
            }
        }

        &:disabled + .atom-radio__appearance {
            border: 1px solid $disabled;
            background: $lightest;
        }
    }

    > input:checked {
        & + .atom-radio__appearance {
            display: flex;
            border: 1px solid $base;
            width: $size;
            height: $size;
            border-radius: 100%;
            &:after {
                content: ' ';
                align-self: center;
                margin: auto;
                display: block;
                width: $size/2;
                height: $size/2;
                background: $base;
                border-radius: 100%;
            }
        }

        &:disabled + .atom-radio__appearance {
            border: 1px solid $disabled;
            background: $lightest;
            &:after {
                background: $light;
            }
        }
    }

    @keyframes zoom-in {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
}
</style>
