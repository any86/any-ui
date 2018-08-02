<template>
    <label :class="{'atom-input--warning': hasWarning}" class="atom-input">
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
                <p>{{warningMessage}}</p>
            </span>
        </i>
    </label>
</template>
<script>
// 不要派发input事件, 因为keyup中已经手动触发了input
import AIcon from '../../packages/Icon';
export default {
    name: 'AtomInput',

    components: { AIcon },

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
            hasWarning: false,
            warningMessage: ''
        };
    },

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
         * 验证规则
         */
        validate(rule) {
            // alert(JSON.stringify(rule))
            this.hasWarning = false;
            this.warningMessage = '';
            if (rule.required) {
                // 必填项目为空
                this.hasWarning = '' === this.value;
            } else if (undefined !== rule.regular) {
                // 正则验证
                this.hasWarning = !rule.regular.test(this.value);
            } else if (undefined !== rule.fn) {
                // 自定义函数验证
                this.hasWarning = !rule.fn();
            }
            // 派发事件
            if (this.hasWarning) {
                this.warningMessage = rule.message;
                this.$emit('warning', this.warningMessage);
            } else {
                this.$emit('success');
            }
        },

        /**
         * 显示错误提示
         * @argument {String} 错误信息
         */
        showWarningDialog(message) {
            this.hasWarning = true;
            this.warningMessage = message;
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
            // this.validate();
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
            this.hasWarning = false;
            this.warningMessage = '';
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

    mounted() {
        // 绑定验证
        let unLoaders = this.vaildateRules.map(rule => {
            // 默认blur触发验证
            const eventName = rule.trigger || 'blur';
            // 因为可能出现多个相同类目的验证rule,
            // 为了解除绑定不遗漏,
            // 存储到新变量
            let validate = this.validate.bind(this, rule);
            this.$refs.input.addEventListener(eventName, validate);
            return () => {
                this.$refs.input.removeEventListener(eventName, validate);
            };
        });

        // 移除验证事件
        this.$on('hook:beforeDestroy', () => {
            unLoaders.forEach(unLoader => {
                unLoader();
            });
        });
    }
};
</script>