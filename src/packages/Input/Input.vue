<template>
    <label :class="{'atom-input--warning': isShowWarning}" class="atom-input">
        <span v-if="$slots.default" class="atom-input__title"><slot></slot></span>
        
        <input ref="input" v-bind="$attrs" :aria-placeholder="$attrs.placeholder" :value="value" @input="input" @focus="focus" @blur="blur" @keyup="keyup" @keydown="keydown" class="atom-input__input">

        <transition name="fadeLeft">
            <a-icon v-if="hasRemove" value="close" size="14" v-show="isShowEmpty" @click="empty" class="atom-input__btn-empty"/>
        </transition>

        <i class="atom-input__icon-warning">
            <a-icon value="warning" size="14"/>
            
            <span v-if="hasWarningDialog" class="warning__dialog">
                <div class="triangle triangle-danger"></div>
                <p>{{warningText}}</p>
            </span>
        </i>
    </label>
</template>
<script>
import AIcon from '../../packages/Icon';
export default {
    name: 'AtomInput',

    props: {
        hasRemove: {
            type: Boolean,
            default: true
        },

        value: {
            required: true
        },

        type: {
            type: String
        },

        hasWarningDialog: {
            type: Boolean,
            default: true
        },

        vaildate: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            isShowEmpty: false,
            isShowWarning: false,
            warningText: ''
        };
    },

    methods: {
        verify() {
            for (let item of this.vaildate) {
                if (item.required && '' == this.value) {
                    // 必填项目为空
                    this.showWarningDialog(item.message);
                    break;
                } else if (undefined !== item.regular && !item.regular.test(this.value)) {
                    this.showWarningDialog(item.message);
                    break;
                } else if (undefined !== item.fn && !item.fn()) {
                    this.showWarningDialog(item.message);
                    break;
                }
            }
        },

        /**
         * 显示错误提示
         * @argument {String} 错误信息
         */
        showWarningDialog(message){
            this.isShowWarning = true;
            this.warningText = message;
            this.$emit('error', message);
        },

        input(e) {
            this.$emit('input', e.target.value); },

        focus(e) {
            // 默认选中文字
            // e.target.select();
            if ('' != this.value) {
                this.isShowEmpty = true;
            }
            this.$emit('focus', e);
        },

        blur(e) {
            this.isShowEmpty = false;
            this.verify();
            this.$emit('warning', '测试!');
            this.$emit('blur', e);
        },

        keyup(e) {
            let value = e.target.value;
            if ('bankCode' == this.type) {
                value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
            } else if ('letter' == this.type) {
                value = value.replace(/\d/g, '');
            } else if ('phone' == this.type) {
                value = value.replace(/\D/g, '').substring(0, 11);
                const valueLen = value.length;
                if (valueLen > 3 && valueLen < 8) {
                    value = `${value.substr(0, 3)} ${value.substr(3)}`;
                } else if (valueLen >= 8) {
                    value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7)}`;
                }
            } else if ('number' == this.type) {
                value = value.replace(/\D/g, '');
            }
            this.$emit('keyup', e);
            this.$emit('input', value);
        },

        keydown(e) {
            this.isShowWarning = false;
            this.warningText = '';
            this.$emit('keydown');
        },

        empty() {
            this.$refs.input.focus();
            this.$emit('input', '');
        }
    },

    watch: {
        value(value) {
            if ('' == value) {
                this.isShowEmpty = false;
            } else {
                this.isShowEmpty = true;
            }
        }
    },

    components: { AIcon }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
$height: 20px;
.atom-input {
    position: relative;
    display: flex;
    font-size: inherit;
    width: 100%;
    background: $background;
    &__title {
        align-self: center;
        padding-right: $gutter;
        font-size: inherit;
    }
    &__input {
        flex: 1;
        align-self: center;
        font-size: inherit;
        background: rgba(255, 255, 255, 0);
        font-size: inherit;
        border: 0 none;
        outline: none;
        width: 100%;
        height: $height;
        line-height: $height;
    }

    &__btn-empty {
        align-self: center;
    }

    &__icon-warning {
        display: none;
        margin-left: $gutter;
        position: relative;
        color: $danger;
        border: 1px solid $danger;
        padding: $gutter/4;
        border-radius: 50%;
        .warning__dialog {
            position: absolute;
            top: 30px;
            right: 0;
            z-index: 2;
            width: 150px;
            background: rgba($danger, 0.8);
            color: $sub;
            border-radius: $radius;
            padding: $gutter/3;
            .triangle {
                transform: rotate(180deg);
                position: absolute;
                right: 5px;
                top: -5px;
                border-top-color: rgba($danger, 0.8);
            }
            > p {
                white-space: pre-wrap;
                color: $sub;
            }
        }
        svg {
            display: block;
        }
    }

    &--warning {
        .atom-input__icon-warning {
            display: inline-block;
            // animation: showTip 300ms;
        }

        .atom-input__title,
        .atom-input__input {
            color: $danger !important;
        }
    }

    @keyframes showTip {
        from {
            transform: scale(1.1);
        }

        to {
            transform: scale(1);
        }
    }
}
</style>
