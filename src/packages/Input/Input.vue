<template>
    <div class="atom-input">
        <span class="title" v-if="!!$slots.default">
            <slot></slot>
        </span>
        <input v-bind="$attrs" ref="input" :value="value" @input="input" @focus="focus" @blur="blur" @keyup="keyup">
        <!-- <input v-on="$listeners" v-bind="$attrs" ref="input" :value="value" @input="input"> -->
        <transition name="fadeLeft">
            <v-close v-if="hasRemove" v-show="isShowEmpty" @click="empty" class="btn-close"></v-close>
        </transition>
    </div>
</template>
<script>
import VClose from '@/packages/Icon/Close';
export default {
    name: 'Input',

    props: {
        hasRemove: {
            type: Boolean,
            default: true
        },

        value: {
            required: true
        }
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
            e.target.select();
            if ('' != this.value) {
                this.isShowEmpty = true;
            }
        },

        blur(e) {
            this.isShowEmpty = false;
        },

        keyup(e) {
            var value = e.target.value;
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
                    value = `${value.substr(0, 3)} ${value.substr(
                        3,
                        4
                    )} ${value.substr(7)}`;
                }
            } else if ('number' == this.type) {
                value = value.replace(/\D/g, '');
            }
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

    components: { VClose }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 0.8rem;
.atom-input {
    width: 100%;
    position: relative;
    display: flex;
    .title {
        height: $height;
        line-height: $height;
        font-size: $normal;
        margin-right: 5%;
    }

    input {
        padding-left: $gutter;
        background: rgba(255, 255, 255, 0);
        font-size: $normal;
        flex: 1;
        box-sizing: border-box;
        border: 0 none;
        outline: none;
        width: 100%;
        height: $height;
        line-height: $height;
    }

    .btn-close {
        width: $height/2;
        height: $height/2;
        display: block;
        margin: auto;
    }
}
</style>
