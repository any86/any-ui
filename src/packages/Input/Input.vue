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
import AIcon from '@/packages/Icon';
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
            this.$emit('warning', message);
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