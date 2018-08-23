<template>
    <div 
        :error="hasError" 
        :loading="isShowLoading" 
        class="atom-input"
        :empty="isEmpty"
        >

        <!-- 前置 -->
        <slot name="prepend"></slot>

        <!-- 默认插槽 -->
        <slot></slot>

        <!-- input -->
        <input 
            ref="input" 
            v-bind="$attrs" 
            :aria-disabled="$attrs.disabled"
            :aria-placeholder="$attrs.placeholder" 
            v-model="text"
            @focus="focus" 
            @blur="blur" 
            @keyup="keyup" 
            @keydown="keydown"
            class="atom-input__input">
        
        <!-- 后置 -->

        <!-- 关闭按钮 -->
        <transition name="fadeLeft">
            <a-icon 
                v-if="clearable" 
                name="close" 
                size="14" 
                v-show="isShowClearBtn"
                @click="clear" 
                class="atom-input__btn-empty"/>
        </transition>

        <template v-if="hasFeedback">
            <!-- 加载图标 -->
            <i class="atom-input__loading"/>

            <!-- 错误图标和文字 -->
            <span class="atom-input__error">
                <a-icon name="warning" size="14"/>
                <span  class="error-message">
                    {{errorMessage}}
                    <i class="triangle triangle-danger"></i>
                </span>
            </span>
        </template>


        <!-- 后置 -->
        <slot name="append"></slot>
    </div>
</template>
<script>
// 1. 不要派发input事件, 因为keyup中已经手动触发了input
// 2. keydown这种事件获取e.target.value会有滞后性,
// 3. keyup的时候才能拿到value,
// 4. 可以用setTimeout可以保证已经拿到值
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
        clearable: {
            type: Boolean,
            default: true,
        },

        value: {
            required: true,
        },

        // bankCode | letter | phone | number
        type: {
            type: String,
        },

        // 验证失败, 是否有图标和对话框
        hasFeedback: {
            type: Boolean,
            default: true,
        },

        // 验证规则
        rules: {
            type: Array,
            default: () => [],
        },

        // 对输入过滤
        filter: {
            type: RegExp,
        },
    },

    computed: {
        isEmpty() {
            return undefined !== this.text && 0 === this.text.length;
        },
    },

    data() {
        return {
            text: '',
            isShowClearBtn: false,
            hasError: false,
            errorMessage: '',
            rulesGroupByEvent: {},
            isShowLoading: false,
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
            return new Promise((resolve, reject) => {
                // 是否通过验证
                if (rule.required) {
                    // 必填
                    if ('' !== this.text) {
                        resolve(true);
                    } else {
                        reject(rule.message);
                    }
                } else if (undefined !== rule.test) {
                    // 正则验证
                    if (rule.test.test(this.text)) {
                        resolve(true);
                    } else {
                        reject(rule.message);
                    }
                } else if (undefined !== rule.minLength) {
                    if (rule.minLength <= this.text.length) {
                        resolve(true);
                    } else {
                        reject(rule.message);
                    }
                } else if (undefined !== rule.maxLength) {
                    // maxlength
                    if (rule.maxLength >= this.text.length) {
                        resolve(true);
                    } else {
                        reject(rule.message);
                    }
                } else if (undefined !== rule.validator) {
                    // 自定义函数验证[同步]
                    if (rule.validator()) {
                        resolve(true);
                    } else {
                        reject(rule.message);
                    }
                } else if (undefined !== rule.asyncValidator) {
                    // 自定义函数验证[异步]
                    this.isShowLoading = true;
                    rule.asyncValidator(({ isPass, message }) => {
                        this.isShowLoading = false;
                        if (isPass) {
                            resolve(true);
                        } else {
                            reject(message);
                        }
                    });
                }
            });
        },

        /**
         * 放在事件里的验证方法
         */
        async validateInEvent(eventName) {
            let rules = this.rulesGroupByEvent[eventName];
            // 如果该事件下没有rule, 那么跳出
            if (undefined === rules) return;

            let isAllPass = true;
            // 如果有一条没通过验证, 那么暂停
            // 有异步验证的情况, 后面的验证也需要等待他的结果, 所以用了await
            for (let rule of rules) {
                try {
                    await this._validate(rule);
                } catch (error) {
                    isAllPass = false;
                    this.showErrorDialog(error);
                    break;
                }
            }
            // 全部验证通过, 那么关闭错误提示
            if (isAllPass) {
                this.hideErrorDialog();
            }
        },

        /**
         * 验证所有规则
         */
        validate(rules) {
            let isAllPass = true;
            return new Promise(async (resolve, reject) => {
                // 如果不指定rules, 那么默认验证所有
                for (let rule of (rules || this.rules)) {
                    try {
                        await this._validate(rule);
                    } catch (error) {
                        isAllPass = false;
                        this.showErrorDialog(error);
                        reject(error);
                        break;
                    }
                }

                // 全部规则验证通过
                if (isAllPass) {
                    this.hideErrorDialog();
                    resolve(true);
                }
            });
        },

        /**
         * 清除验证结果
         */
        clearValidate() {
            this.isShowLoading = false;
            this.hideErrorDialog();
            this.$emit('clear-validate');
        },

        /**
         * 显示错误提示
         * @argument {String} 错误信息
         */
        showErrorDialog(message) {
            this.hasError = true;
            this.errorMessage = message;
            this.$emit('error', message);
        },

        /**
         * 关闭错误对话框
         */
        hideErrorDialog() {
            this.hasError = false;
            this.errorMessage = '';
            this.$emit('success');
        },

        focus(e) {
            this.isFocused = true;
            // 默认不选中文字
            if (this.isSelectAll) {
                e.target.select();
            }
            if ('' !== this.text) {
                this.isShowClearBtn = true;
            }
            this.$emit('focus', e);
        },

        blur(e) {
            this.validateInEvent('blur');
            this.isShowClearBtn = false;
            this.$emit('blur', e);
        },

        keyup(e) {
            // 过滤
            let value = this.filterInput(this.text);

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
            this.text = value;
            this.$emit('keyup', e);
            this.$emit('input', value);
            // 强制刷新组件, 当过滤后的值和前值一样的时候不会触发
            this.$forceUpdate();
            this.validateInEvent('keyup');
        },

        /**
         * 每次输入清空错误提示
         */
        keydown(e) {
            this.$emit('keydown');
        },

        /**
         * 清空input框
         */
        clear() {
            this.$emit('input', '');
            this.$emit('clear');
            this.$refs.input.focus();
        },
    },

    watch: {
        value(value) {
            // 同步外部值
            this.text = value;
            if ('' == value) {
                this.isShowClearBtn = false;
            } else {
                this.isShowClearBtn = true;
            }
        },
    },

    created() {
        // 同步默认值
        this.text = this.value;
    },

    mounted() {
        this.rules.forEach(rule => {
            // 默认blur触发验证
            const eventName = rule.trigger || 'blur';
            if (undefined === this.rulesGroupByEvent[eventName]) {
                this.rulesGroupByEvent[eventName] = [];
            }
            this.rulesGroupByEvent[eventName].push(rule);
        });
    },
};
</script>