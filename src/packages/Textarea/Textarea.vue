<template>
    <div class="atom-textarea">
        <textarea 
            ref="textarea" 
            v-bind="$attrs"
            :value="value"
            @focus="focus"
            @blur="blur"
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
        }
    },

    mounted() {
        autosize(this.$refs.textarea);
    },

    data() {
        return {};
    },

    methods: {
        input(e) {
            this.$emit('input', e.target.value);
        },

        focus(e) {
            this.$emit('focus', e);
        },

        blur(e) {
            this.$emit('blur', e);
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