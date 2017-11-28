<template>
    <div class="atom-textarea">
        <textarea :maxLength="maxLength" :placeholder="placeholder" :value="value" @input="input"></textarea>
        <p class="prompt"><span>{{length}}</span>/{{maxLength}}</p>
    </div>
</template>
<script>
export default {
    name: 'Textarea',

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
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-textarea {
    background: $background;
    border: 1px solid $lighter;
    border-width: 1px 0 1px 0;
    >label {
        display: block;
        padding: 2*$gutter;
        border-bottom: 1px solid $lighter;
        font-size: $big;
    }
    >textarea {
        display: block;
        min-height: 2rem;
        width: 100%;
        box-sizing: border-box;
        padding: 2*$gutter;
        outline: none;
        resize: none;
        border: 0 none;
        resize: none;
        background: transparent;
        font-size: $normal;
        word-break: break-all;
        word-wrap: break-word;
    }
    >p{
        padding: $gutter 2*$gutter;
        text-align: right;
        font-size: $normal;
        >span{color: $base;font-size: inherit;}
    }
}
</style>
