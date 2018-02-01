<template>
    <div class="atom-input">
        <input v-bind="$attrs" ref="input" :aria-placeholder="$attrs.placeholder" :value="value" @input="input" @focus="focus" @blur="blur" @keyup="keyup">
        <transition name="fadeLeft">
            <a-icon v-if="hasRemove" value="close" size="14" v-show="isShowEmpty" @click="empty" class="atom-input__close"/>
        </transition>
    </div>
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

        type: {}
    },

    data() {
        return {
            label: '',
            isShowEmpty: false
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
            this.$emit('focus',e);
        },

        blur(e) {
            this.isShowEmpty = false;
            this.$emit('blur',e);
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
            this.$emit('keyup',e);
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
$height: 0.6rem;
.atom-input {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    background: $background;
    > input {
        background: rgba(255, 255, 255, 0);
        font-size: $normal;
        flex: 1;
        border: 0 none;
        outline: none;
        width: 100%;
        height: $height/2;
        line-height: $height/2;
    }

    &__close {
        margin-right: $gutter/2;
        width: $height/2;
        height: $height/2;
        display: block;
        align-self: center;
    }
}
</style>
