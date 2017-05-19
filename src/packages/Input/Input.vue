<template>
    <div class="component-input">
        <span class="label"><slot></slot></span>
        <input ref="input" :value="value" @input="input" @focus="focus" @blur="blur" @keyup="keyup" :disabled="disabled" :placeholder="placeholder" :type="type" :maxlength="maxlength">
        <!-- border -->
        <div class="border"></div>
        <transition name="fadeLeft">
            <Icon v-show="isShowEmpty" @click.native="empty" class="button-close" value="remove"></Icon>
        </transition>
    </div>
</template>
<script>
import Icon from '@/packages/Icon/Icon'
export default {
    name: 'Input',

    props: {
        disabled: {
            type: Boolean
        },

        maxlength: {
            type: Number
        },

        value: {
            required: true
        }
    },

    mounted() {
        // 自定义属性同步到data
        ['type', 'placeholder'].forEach(prop=>{
            var propValue = this.$el.getAttribute('type');
            if (null != propValue) {
                this[prop] = propValue;
            }
        });
    },

    data() {
        return {
            label: '',
            type: 'text',
            placeholder: '',
            isShowEmpty: false
        };
    },

    methods: {
        input(e) {
            this.$emit('input', e.target.value);
        },

        focus(e) {
            if ('' != this.value) {
                this.isShowEmpty = true;
            }
            this.$emit('focus');
        },

        blur() {
            this.isShowEmpty = false;
            this.$emit('blur');
        },

        keyup(e) {
            var value = e.target.value;
            if ('bankCode' == this.type) {
                value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
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
            this.$emit('input', value);
            this.$emit('keyup');
        },

        empty() {
            this.$emit('input', '');
            this.$refs.input.focus();
            this.$emit('empty');
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

    components: {
        Icon
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-input {
    height: $gutter*6 + 1px;
    position: relative;
    display: flex;

    .label {height: $gutter*6;line-height: $gutter*6;font-size: 14px;}

    input {
        font-size: 14px;
        flex: 1;
        box-sizing: border-box;
        padding: 0 2*$gutter;
        border: 0 none;
        outline: none;
        width: 100%;
        height: $gutter*6;
        line-height: $gutter*6;
    }
    input:focus + .border {
        border-color: $base;
    }

    .border {
        position: absolute;
        height: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid $lighter;
        transition: all .3s;
    }

    .button-close {
        margin: $gutter;
        text-align: center;
        width: $gutter*4;
        height: $gutter*4;
        line-height: $gutter*4;
        border-radius: 100%;
        background: $lighter;
        color: #fff;
    }
}

.disabled {
    // @include disabled;
    // input{@include disabled;}
    // .button-close{@include disabled;}
}
</style>
