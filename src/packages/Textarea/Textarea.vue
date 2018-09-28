<template>
    <div class="atom-textarea">
        <slot name="prepend"/>
        <textarea 
            ref="textarea" 
            v-bind="$attrs"
            :value="value"
            @focus="focus"
            @blur="blur"
            @keyup="keyup"
            @input="input"/>
        <slot name="append"/>
    </div>
</template>
<script>
import autosize from 'autosize';
export default {
    name: 'AtomTextarea',

    props: {
        value: {
            type: String,
        },

        filterExp: {
            type: RegExp,
        },
    },

    computed: {
        length() {
            // 表情字符算一个字符
            const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
            return this.value.replace(regexAstralSymbols, '_').length;
        },
    },

    data() {
        return { maxlength: Infinity };
    },

    watch: {
        length(length) {
            this.$emit('change-length', length);
        },
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
            if (this.maxlength >= this.length) {
                this.$emit('input', e.target.value);
            }
        },

        focus(e) {
            this.$emit('focus', e);
        },

        blur(e) {
            this.$emit('blur', e);
        },

        keyup(e) {
            this.$emit('input', this.filter(e.target.value));
            this.$forceUpdate();
        },
    },

    created() {
        this.$emit('input', this.filter(this.value));
    },

    mounted() {
        autosize(this.$refs.textarea);
        this.maxlength = this.$refs.textarea.getAttribute('maxlength');
    },

    destroyed() {
        autosize.destroy(this.$refs.textarea);
    },
};
</script>