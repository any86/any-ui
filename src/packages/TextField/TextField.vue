<template>
    <div class="atom-text-field">
        <a-input 
            :value="value"
            :has-feedback="false"
            v-bind="$attrs"
            @error="inputErrorHandler"
            @success="inputSuccessHandler"
            @input="inputHandler"
            class="atom-text-field__atom-input">

            <!-- label 插槽 -->
            <label slot="append" class="atom-text-field__label">
                <slot name="label">{{label}}</slot>
            </label>

            <!-- append 插槽 -->
            <template slot="append">
                <slot name="append"></slot>
            </template>

            <!-- bottom-line -->
            <div slot="append" class="atom-text-field__bottom-line"></div>


            
        </a-input>
        
        <!-- error -->
        <p :style="{visibility: hasError ? 'visible':'hidden'}" class="atom-text-field__error-message">{{errorMessage}}</p>
    </div>
</template>
<script>
import AInput from '../../packages/Input';
export default {
    name: 'AtomTextField',

    components: { AInput },

    props: {
        label: {
            type: String,
        },

        value: {
            required: true,
        },
    },

    computed: {
        // 是否为空
        isEmpty() {
            return undefined !== this.text && 0 === this.text.length;
        },

        // $attrs和$props的集合
        // attrsAndProps() {
        //     return { ...this.$attrs, ...this.$props };
        // },
    },

    data() {
        return {
            text: '',
            hasError: false,
            errorMessage: '',
        };
    },

    methods: {
        /**
         * 验证错误触发
         * @param {String} 错误文案
         */
        inputErrorHandler(errorMessage) {
            this.hasError = true;
            this.errorMessage = errorMessage;
        },

        /**
         * 验证错误修正后触发
         */
        inputSuccessHandler() {
            this.hasError = false;
            this.errorMessage = '';
        },

        /**
         * 输入触发
         */
        inputHandler(value) {
            this.$emit('input', value);
        },
    },
};
</script>