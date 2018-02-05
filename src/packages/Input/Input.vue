<template>
    <label class="atom-input">
        <span v-if="$slots.default" class="atom-input__title"><slot></slot></span>
        <a-popper :is-show.sync="isShowWarning" placement="auto" class="flex-item">
            <p v-show="isShowWarning" style="padding:15px;">{{warningText}}</p>
            <input slot="reference" ref="input" v-bind="$attrs" :aria-placeholder="$attrs.placeholder" :value="value" @input="input" @focus="focus" @blur="blur" @keyup="keyup" @keydown="$emit('keydown',$event)" class="atom-input__input">
        </a-popper>

        <transition name="fadeLeft">
            <a-icon v-if="hasRemove" value="close" size="14" v-show="isShowEmpty" @click="empty" class="atom-input__btn-empty"/>
        </transition>
    </label>
</template>
<script>
import AIcon from '../../packages/Icon';
export default {
    name: 'AtomInput',

    props: {
        hasRemove: {
            type: Boolean,
            default: true
        },

        value: {
            required: true
        },

        type: {},
    },

    data() {
        return {
            isShowEmpty: false,
            isShowWarning: false,
            warningText: ''
        };
    },

    methods: {
        input(e) {
            this.$emit('input', e.target.value);
        },

        focus(e) {
            
            // 默认选中文字
            // e.target.select();
            if ('' != this.value) {
                this.isShowEmpty = true;
            }
            this.$emit('focus', e);
        },

        blur(e) {
            this.isShowEmpty = false;
            this.$emit('warning', '测试!');
            this.$emit('blur', e);
        },

        keyup(e) {
            let value = e.target.value;
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
            this.$emit('keyup', e);
            this.$emit('input', value);
        },

        empty() {
            this.$refs.input.focus();
            this.$emit('input', '');
        }
    },

    watch: {
        value(value) {
            if ('' == value) {
                this.isShowEmpty = false;
            } else {
                this.isShowEmpty = true;
            }
        }
    },

    components: { AIcon }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
$height: 20px;
.atom-input {
    position: relative;
    display: flex;
    font-size: inherit;
    width: 100%;
    background: $background;
    &__title {
        align-self: center;
        padding-right: $gutter;
        font-size: inherit;
    }
    &__input {
        flex: 1;
        align-self: center;
        font-size: inherit;
        background: rgba(255, 255, 255, 0);
        font-size: inherit;
        border: 0 none;
        outline: none;
        width: 100%;
        height: $height;
        line-height: $height;
    }

    &__btn-empty {
        align-self: center;
    }
}
</style>
