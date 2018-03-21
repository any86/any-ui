<template>
    <div class="atom-textarea">
        <textarea :maxLength="maxLength" :placeholder="placeholder" :value="value" @input="input"></textarea>
        <p class="prompt"><span>{{length}}</span>/{{maxLength}}</p>
    </div>
</template>
<script>
export default {
    name: 'AtomTextarea',

    props: {
        maxLength: {
            type: Number,
            default: 100
        },
        value: {
            type: String
        },
        placeholder: {
            default: '请输入'
        }
    },

    data() {
        return {};
    },

    methods: {
        input(e){
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
    }
}
</script>