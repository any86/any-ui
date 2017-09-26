<template>
    <label :style="{width: !!this.$slots.default && '100%'}" class="component-switch" :class="{'component-switch-disabled': disabled}">
        <a v-if="!!this.$slots.default" class="title">
            <slot></slot>
        </a>
        <span class="appearance">
            <input :disabled="disabled" :checked="value" @change="change" @click.stop="()=>{}" type="checkbox">
            <div class="checkbox"></div>
        </span>
    </label>
</template>
<script>
export default {
    name: 'Switch',

    props: {
        value: {
            type: Boolean
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        change(e) {
            if(!this.disabled) {
                this.$emit('input', e.target.checked);
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: .56rem;
label.component-switch {
    display: inline-flex;
    >.title {
        line-height: $height;
        display: block;
        flex: 1;
    }
    >.appearance {
        input {
            display: none;
        }

        .checkbox {
            user-select: none;
            position: relative;
            overflow: hidden;
            border: 1px solid $lightest;
            box-sizing: content-box;
            border-radius: $height;
            width: 1.8 * $height;
            height: $height;
            transition: all .5s ease;

            &:before {
                font-size: 0;
                content: " ";
                display: block;
                position: absolute;
                z-index: 2;
                top: 0;
                left: 0;
                height: $height;
                width: $height;
                border-radius: $height;
                transition: all .3s ease;
                background: $sub;
                box-shadow: $shadowDown, $shadowUp;
            }
            &:after {
                font-size: 0;
                content: " ";
                display: block;
                position: absolute;
                z-index: 1;
                top: 0;
                right: 0;
                height: $height;
                width: 1.8 * $height;
                border-radius: $height;
                transition: all .3s ease;
                transform: scale(1);
                background: #fff;
            }
        }

        input:checked+.checkbox {
            transition-duration: 0ms;
            border: 1px solid $base;
            background: $base;
        }

        input:checked+.checkbox:before {
            transform: translateX($height * 0.8);
        }
        input:checked+.checkbox:after {
            transform: scale(0);
        }
    } // 禁用状态
    &-disabled {
        >.appearance {
            .checkbox {
                &:before {
                    background: $disabled;
                }
                &:after {
                    background: $disabled;
                }
            }
            input:checked+.checkbox {
                transition-duration: 0ms;
                border: 1px solid $lighter;
                background: $lightest;
            }
        }
    }
}
</style>
