<template>
    <label :class="{'atom-input--warning': isShowWarning}" class="atom-input">
        <span v-if="$slots.default" class="atom-input__title"><slot></slot></span>
        
        <input 
            ref="input" 
            :autofocus="autofocus" 
            v-bind="$attrs" 
            :aria-placeholder="$attrs.placeholder" 
            :value="value"
            @focus="focus" 
            @blur="blur" 
            @keyup="keyup" 
            @keydown="keydown" 
            class="atom-input__input">

        <transition name="fadeLeft">
            <a-icon v-if="hasRemove" name="close" size="14" v-show="isShowEmpty" @click="clear" class="atom-input__btn-empty"/>
        </transition>

        <i class="atom-input__icon-warning">
            <a-icon name="warning" size="14"/>
            
            <span v-if="hasWarningDialog" class="warning__dialog">
                <div class="triangle triangle-danger"></div>
                <p>{{warningText}}</p>
            </span>
        </i>
    </label>
</template>
<script>
// 不要派发input事件, 因为keyup中已经手动触发了input
import AIcon from '../../packages/Icon';
export default {
    name: 'AtomInput',

    props: {
        hasRemove: {
            type: Boolean,
            default: true
        },

        autofocus: {
            type: Boolean,
            default: false
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

        vaildateRules: {
            type: Array,
            default: () => []
        },

        filter: {
            type: RegExp
        }
    },

    data() {
        return {
            isShowEmpty: false,
            isShowWarning: false,
            warningText: ''
        };
    },

    // beforeMount() {
    //     // 过滤
    //     this.$emit('input', this.filterInput(this.value));
    // },

    methods: {
        /**
         * 过滤指定字符
         * @argument {String} 输入
         * @returns {String} 过滤后字符串
         */
        filterInput(string) {
            return undefined !== this.filter ? string.replace(this.filter, '') : string;
        },

        /**
         * 验证validatas规则
         */
        validate() {
            let isPass = true;
            for (let item of this.vaildateRules) {
                if (item.required && '' == this.value) {
                    // 必填项目为空
                    isPass = false;
                    this.showWarningDialog(item.message);
                    break;
                } else if (undefined !== item.regular && !item.regular.test(this.value)) {
                    isPass = false;
                    this.showWarningDialog(item.message);
                    break;
                } else if (undefined !== item.fn && !item.fn()) {
                    isPass = false;
                    this.showWarningDialog(item.message);
                    break;
                }
            }
            // 通过验证
            if(isPass){
                this.$emit('success');
            }
            return isPass;
        },

        /**
         * 显示错误提示
         * @argument {String} 错误信息
         */
        showWarningDialog(message) {
            this.isShowWarning = true;
            this.warningText = message;
            this.$emit('warning', message);
        },

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
            this.validate();
            this.$emit('blur', e);
        },

        keyup(e) {
            // 过滤

            let value = this.filterInput(e.target.value);
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
            // 强制刷新组件, 当过滤后的值和前值一样的时候不会触发
            this.$forceUpdate();
        },

        keydown(e) {
            this.isShowWarning = false;
            this.warningText = '';
            this.$emit('keydown');
        },

        clear() {
            this.$refs.input.focus();
            this.$emit('input', '');
            this.$emit('clear');
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