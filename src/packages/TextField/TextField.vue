<template>
    <div class="atom-text-field">
        <a-input v-model="text" class="atom-text-field__atom-input">
            <!-- float label -->
            <label slot="append" class="atom-text-field__label">{{label}}</label>
            <!-- bottom-line -->
            <div slot="append" class="atom-text-field__bottom-line"></div>
        </a-input>
        
        <!-- help -->
        <p class="atom-text-field__help">help xxx xx</p>
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
            default: 'xxxx xxx',
        },

        // focus时候是否选中所有文字
        isSelectAll: {
            type: Boolean,
            default: false,
        },
        hasRemove: {
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
            return 0 === this.text.length;
        },
    },

    data() {
        return {
            text: '',
        };
    },

    methods: {},

    watch: {},

    created() {
        // 同步默认值
    },

    mounted() {},
};
</script>