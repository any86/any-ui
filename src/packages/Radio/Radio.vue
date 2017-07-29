<template>
    <div :class="['component-radio', disabled && 'disabled']">
        <label>
            <a v-if="!!$slots.default" class="title">
                <slot></slot>
            </a>
            <span class="radio">
                <input :disabled="disabled" :value="value" :checked="isChecked" @change="change" type="radio">
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
        }
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
    }
    // 正常
    >label {
        display: flex;
        >a.title {
            flex: 1;
            height: $height;
            line-height: $height;
            font-size: $big;
            &.active {
                color: $base;
            }
        }
        >span.radio {
            position: relative;
            width: $height;
            height: $height;
            >input {
                display: none;
            }
            >.icon {
                position: absolute;
                top: 20%;
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
            }
            >input:checked+.icon {
                // transform: scale(1.2) rotate(-45deg);
                border-color: $base;
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
