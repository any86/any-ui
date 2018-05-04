<template>
    <div class="atom-textarea border">
        <textarea 
            ref="textarea" 
            v-bind="$attrs"
            :value="value"
            @focus="focus"
            @blur="blur"
            @keyup="keyup"
            @input="input"/>
        <p v-if="isShowPrompt && 0 < maxLength" class="atom-textarea__prompt"><span>{{length}}</span>/{{maxLength}}</p>
    </div>
</template>
<script>
import autosize from 'autosize';
export default {
    name: 'AtomTextarea',

    props: {
        isShowPrompt: {
            type: Boolean,
            default: false
        },

        value: {
            type: String
        },

        filterExp: {
            type: [String, RegExp]
        }
    },

    created() {
        this.$emit('input', this.filter(this.value));
    },

    mounted() {
        autosize(this.$refs.textarea);
    },

    data() {
        return {};
    },

    methods: {
        /**
         * 过滤指定字符
         * @argument {String} 输入
         * @returns {String} 过滤后字符串
         */
        filter(string) {
            return undefined !== this.filterExp ? string.replace(this.filterExp, '') : string;
        },

        input(e) {
            this.$emit('input', e.target.value);
        },

        focus(e) {
            this.$emit('focus', e);
        },

        blur(e) {
            this.$emit('blur', e);
        },

        keyup(e) {
            this.$emit('input', this.filter(e.target.value));
        }
    },

    computed: {
        length() {
            if (this.isShowPrompt) {
                // 表情字符算一个字符
                function countSymbols(text = '') {
                    const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
                    return text.replace(regexAstralSymbols, '_').length;
                }
                return countSymbols(this.value);
            }
        }
    },

    destroyed() {
        autosize.destroy(this.$refs.textarea);
    }
};
</script>