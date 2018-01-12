<template>
    <label :style="{width: !!this.$slots.default && '100%'}" :class="[disabled && 'disabled']" class="component-checkbox">
        <span v-if="!!this.$slots.default" class="title" :class="{reverse}">
            <slot></slot>
        </span>
        <input v-model="checked" :disabled="disabled" :true-value="trueValue" :false-value="falseValue" type="checkbox" @click.stop="()=>{}">
        <span class="appearance"></span>
    </label>
</template>
<script>
export default {
    name: 'Checkbox',

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        'true-value': {
            default: true
        },

        'false-value': {
            default: false
        },

        reverse: {
            type: Boolean,
            default: false
        },

        value: {
            required: false
        }
    },

    data() {
        return {
            checked: false
        };
    },

    mounted() {
        this.checked = this.value;
    },

    watch: {
        value(value) {
            this.checked = value;
        },

        checked(value) {
            this.$emit('input', value);
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
$height: .5rem;
label.component-checkbox {
    display: flex;
    align-items: center;
    overflow: hidden;
    .title {
        flex: 1;
        &.reverse {
            order: 1;
            padding-left: $gutter*2;
        }
    }
    >input {
        display: none;
        opacity: 0; // 未选中
        +.appearance {
            border: 1px solid $light;
            width: $height;
            height: $height;
            background: $sub;
            border-radius: $borderRadius;
            display: flex;
            &:after {
                content: ' ';
                height: .25*$height;
                width: .5*$height;
                margin: .26*$height auto;
                border-style: solid;
                border-color: $sub;
                border-width: 0 0 2px 2px;
                display: block;
                overflow: hidden;
                transform: rotate(-45deg);
            }
        }
        &:disabled+.appearance {
            border-color: $light;
            background: $lightest;
            &:after {
                border-color: $lightest;
            }
        } // 选中
        &:checked {
            &+.appearance {
                border-color: $base;
                &:after {
                    border-color: $base;
                    animation: zoom-in .5s;
                }
            }
            &:disabled+.appearance {
                border-color: $light;
                background: $lighter;
                &:after {
                    border-color: $sub;
                }
            }
        }
    }
}

@keyframes zoom-in {
    0% {
        opacity: 0;
        transform: scale(.8) rotate(-45deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(-45deg);
    }
}
</style>
