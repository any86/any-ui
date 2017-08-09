<template>
    <div class="component-input">
        <span class="title" v-if="!!$slots.default">
            <slot></slot>
        </span>
        <input v-on="$listeners" ref="input" :value="value" @input="input" @focus="focus" @blur="blur" @keyup="keyup" :readonly="readonly" :disabled="disabled" :placeholder="placeholder" :type="type" :maxlength="maxlength">
        <transition name="fadeLeft">
            <!-- <i @click.native="empty" class="button-close"></i> -->
            <i v-if="hasRemove" v-show="isShowEmpty" @click="empty" class="button-close"></i>
        </transition>
    </div>
</template>
<script>
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
        console.log(this.$listeners)
        // for (var key in this.$listeners) {
        //     // alert(key)
        // }
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
            this.$emit('focus', e);
        },

        blur(e) {
            this.isShowEmpty = false;
            this.$emit('blur', e);
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
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: .8rem;
.component-input {
    width: 100%;
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

    .button-close {
        width: $height;
        height: 100%;
        display: block;
        background: url('./close.svg') center center no-repeat;
        background-size: 50%;
        margin: auto;
    }
}
</style>
