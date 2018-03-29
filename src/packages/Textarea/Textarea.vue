<template>
    <div class="atom-textarea">
        <textarea ref="textarea" :maxLength="maxLength" :placeholder="placeholder" :value="value" @input="input"/>
        <p v-if="isShowPrompt" class="atom-textarea__prompt"><span>{{length}}</span>/{{maxLength}}</p>
    </div>
</template>
<script>
import autosize from 'autosize';
export default {
    name: 'AtomTextarea',

    props: {
        maxLength: {
            type: Number,
        },

        isShowPrompt: {
            type: Boolean,
            default: false
        },
        
        value: {
            type: String
        },

        placeholder: {
            default: '请输入'
        }
    },

    mounted(){
        autosize(this.$refs.textarea);
    },

    data() {
        return {};
    },

    methods: {
        input(e) {
            this.$emit('input', e.target.value);
        }
    },

    computed: {
        length() {
            // 表情字符算一个字符
            function countSymbols(text = '') {
                const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
                return text.replace(regexAstralSymbols, '_').length;
            }
            return countSymbols(this.value);
        }
    },

    destroyed(){
        autosize.destroy(this.$refs.textarea);
    }
};
</script>