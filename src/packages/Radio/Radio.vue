<template>
    <div :class="['component-radio', disabled && 'disabled']">
        <label>
            <span v-if="!!$slots.default" class="title">
                <slot></slot>
            </span>
            <span class="radio" :class="{checked: selfValue == value}">
                <input :disabled="disabled" :value="selfValue" :checked="isChecked" @change="change" type="radio">
                <span class="icon"></span>
            </span>
        </label>
    </div>
</template>
<script>
export default {
    name: 'Radio',

    data() {
        return {};
    },

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        value: {
            required: true
        },

        selfValue: {
            required: true
        },

    },
    methods: {
        change() {
            if (!this.disabled) {
                this.$emit('input', this.selfValue);
            }
        }
    },

    computed: {
        isChecked() {
            return this.value == this.selfValue;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: .5rem;
.component-radio {
    // disabled
    &.disabled {
        >label {
            >span {
                >input:checked+.icon {
                    border-color: $disabled;
                }
                >.icon {
                    border-color: $disabled;
                }
            }
            >a {
                color: $disabled;
                &.active {
                    color: $disabled;
                }
            }
        }
    } // 正常
    >label {
        display: flex;
        align-items: center;
        >.title {
            flex: 1;
            font-size: $normal;
            &.active {
                color: $base;
            }
        }
        >span.radio {
            position: relative;
            width: $height;
            height: $height;
            border: 1px solid $light;
            border-radius: 100%;
            &.checked{
                border:1px solid $base;
                // box-shadow: 1px 1px 1px $base;
                background: $base;
            }

            >input {
                display: none;
            }
            >.icon {
                display: none;
            }
            >input:checked+.icon {
                position: absolute;
                top: 25%;
                left: 0;
                right: 0;
                width: $height*0.6;
                height: $height*0.3;
                border-color: $darker;
                border-style: solid;
                border-width: 0 0 2px 2px;
                display: block;
                margin: auto;
                transform: rotate(-45deg);
                transition: transform .3s;
                border-color: #fff;
                animation: zoom-in .5s;
            }
        }
    }
}

@keyframes zoom-in {
    0% {
        opacity: 0;
        transform: scale(1.5) rotate(-45deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(-45deg);
    }
}
</style>
