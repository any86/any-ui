<template>
    <div :class="['component-radio', disabled && 'disabled']">
        <label>
            <span>
                <input :disabled="disabled" :value="selfValue" :checked="isChecked" @change="change" type="radio">
                <span class="icon"></span>
            </span>
            <a v-if="$slots.default" :class="{active: isChecked}">
                <slot></slot>
            </a>
        </label>
    </div>
</template>
<script>
export default {
    name: 'Radio',

    data() {
        return {}
    },

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        selfValue: {

        },

        value: {

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
        display: block;
        >span {
            position: relative;
            width: $height;
            height: $height;
            display: inline-block;
            vertical-align: middle;
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
                transition: all .3s;
            }
            >input:checked+.icon {
                border-color: $base;
            }
        }
        >a {
            display: inline-block;
            height: $height;
            line-height: $height;
            font-size: $height*.8;
            vertical-align: middle;
            &.active {
                color: $base;
            }
        }
    }
}

.v-enter-active {
    animation: zoomIn .3s;
}

.v-leave-active {
    animation: zoomOut .3s;
}

@keyframes zoomIn {
    0% {
        opacity: 0;
        transform: scale(2);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes zoomOut {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(2);
    }
}
</style>
