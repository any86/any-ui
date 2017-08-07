<template>
    <div class="component-input">
        <span class="title" v-if="!!$slots.default">
            <slot></slot>
        </span>
        <input ref="input" :value="value" @input="input" @focus="focus" @blur="blur" @keyup="keyup" :readonly="readonly" :disabled="disabled" :placeholder="placeholder" :type="type" :maxlength="maxlength">
        <!-- border -->
        <!-- <div class="border"></div> -->
        <transition name="fadeLeft">
            <!-- <i @click.native="empty" class="button-close"></i> -->
             <i v-if="hasRemove" v-show="isShowEmpty" @click.native="empty" class="button-close"></i>  
        </transition>
    </div>
</template>
<script>
import Icon from '@/packages/Icon/Icon'
export default {
    name: 'Input',

    props: {
        hasRemove: {
            type: Boolean,
            default: true
        },

        disabled: {
            type: Boolean
        },

        readonly: {
            type: Boolean
        },

        maxlength: {
            type: Number
        },

        placeholder: {
            type: String
        },

        type: {
            type: String
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

    mounted() {

        for (var key in this.$listeners) {
            // alert(key)
        }

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
            this.$emit('keyup', e);
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
$height: $gutter*8;
.component-input {
    width: 100%;
    box-sizing: border-box; // height: $height;
    padding-bottom: 1px;
    position: relative;
    display: flex;
    .title {
        height: $height;
        line-height: $height;
        font-size: $big;
        margin-right: 5%;
    }

    input {
        background: rgba(255, 255, 255, 0);
        font-size: $big;
        flex: 1;
        box-sizing: border-box;
        border: 0 none;
        outline: none;
        width: 100%;
        height: $height;
        line-height: $height;
    }
    input:focus+.border {
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
        display: inline-block;
        background: url('./close.svg');
        background-size: 100%;
        margin: $height*0.3;
        text-align: center;
        width: $height*0.4;
        height: $height*0.4;
        line-height: $height*0.4;
    }
}

// .disabled {
//     // @include disabled;
//     // input{@include disabled;}
//     // .button-close{@include disabled;}
// }
</style>
