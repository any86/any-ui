<template>
    <div class="atom-text-field">
        <a-input 
            v-model="text"
            v-bind="attrsAndProps"
            :has-feedback="false"
            @error="inputErrorHandler"
            @success="inputSuccessHandler"
            class="atom-text-field__atom-input">
            <!-- float label -->
            <label slot="append" class="atom-text-field__label">{{label}}</label>
            <!-- bottom-line -->
            <div slot="append" class="atom-text-field__bottom-line"></div>
        </a-input>
        
        <!-- error -->
        <p v-if="hasError" class="atom-text-field__error-message">{{errorMessage}}</p>
    </div>
</template>
<script>
import AInput from '../../packages/Input';
export default {
    name: 'AtomTextField',

    components: { AInput },

    props: {
        label: {
            type: String
        },

        value: {
            required: true,
        },

        // bankCode | letter | phone | number
        type: {
            type: String,
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
            return 0 === this.text.length;
        },
        
        attrsAndProps(){
            return {...this.$attrs, ...this.$props};
        }
    },

    data() {
        return {
            text: '',
            hasError: false,
            errorMessage: ''
        };
    },

    methods: {
        inputErrorHandler(errorMessage){
            this.hasError = true;
            this.errorMessage = errorMessage;
        },

        inputSuccessHandler(){
            this.hasError = false;
            this.errorMessage = '';
        },
    },

    watch: {},

    created() {
        // 同步默认值
    },

    mounted() {
        log(this);
    },
};
</script>