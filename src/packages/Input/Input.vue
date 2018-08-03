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
            <a-icon v-if="hasRemove" name="close" size="14" v-show="isShowClearBtn" @click="clear" class="atom-input__btn-empty"/>
        </transition>

        <i class="atom-input__warning">
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
        // focus时候是否选中所有文字
        isSelectAll: {
            type: Boolean,
            default: false,
        },
        hasRemove: {
            type: Boolean,
            default: true,
        },

        autofocus: {
            type: Boolean,
            default: false,
        },

        value: {
            required: true,
        },

        type: {
            type: String,
        },

        hasWarningDialog: {
            type: Boolean,
            default: true,
        },

        vaildateRules: {
            type: Array,
            default: () => [],
        },

        filter: {
            type: RegExp,
        },
    },

    data() {
        return {
            isShowClearBtn: false,
            hasWarning: false,
            warningMessage: '',
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
        _validate(rule) {
            if (this.hasWarning) return;
            log(rule)
            if (rule.required && '' === this.value) {
                log('required', this.hasWarning);
                // 必填
                this.hasWarning = true;
            } else if (undefined !== rule.test && !rule.test.test(this.value)) {
                log('test', this.hasWarning);
                // 正则验证
                this.hasWarning = true;
            } else if (undefined !== rule.fn && !rule.fn()) {
                // 自定义函数验证
                this.hasWarning = true;
            }
            // 派发事件
            if (this.hasWarning) {
                this.warningMessage = rule.message;
                this.$emit('warning', this.warningMessage);
            } else {
                this.$emit('success');
            }
            // return this.hasWarning;
        },
        /**
         * 验证所有规则
         */
        validate(){
            this.clearWarning();
            let isSuccess = true;
            for(let rule of this.vaildateRules) {
                this._validate(rule);
                if(this.hasWarning){
                    isSuccess = false;
                    break;
                }
            };
            return isSuccess;
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
            // 默认不选中文字
            if (this.isSelectAll) {
                e.target.select();
            }
            if ('' != this.value) {
                this.isShowClearBtn = true;
            }
            this.$emit('focus', e);
        },

        blur(e) {
            this.clearWarning();
            this.isShowClearBtn = false;
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

        /**
         * 每次输入清空错误提示
         */
        keydown(e) {
            this.clearWarning();
            this.$emit('keydown');
        },

        /**
         * 清空input框
         */
        clear() {
            this.clearWarning();
            this.$emit('input', '');
            this.$emit('clear');
            this.$refs.input.focus();
        },

        /**
         * 关闭警告提示
         */
        clearWarning() {
            this.hasWarning = false;
            this.warningMessage = '';
        },
    },

    watch: {
        value(value) {
            if ('' == value) {
                this.isShowClearBtn = false;
            } else {
                this.isShowClearBtn = true;
            }
        },
    },

    mounted() {
        // 绑定验证
        const unLoaders = this.vaildateRules.map(rule => {
            // 默认blur触发验证
            const eventName = rule.trigger || 'blur';
            const _validate = this._validate.bind(this, rule);
            this.$refs.input.addEventListener(eventName, _validate);
            return () => {
                this.$refs.input.removeEventListener(eventName, _validate);
            };
        });

        // 移除验证事件
        this.$on('hook:beforeDestroy', () => {
            unLoaders.forEach(unLoader => {
                unLoader();
            });
        });
    },
};
</script>