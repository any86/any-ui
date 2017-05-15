<template>
    <div class="com-input" :class="{'input-group': opts.icon}">
        <transition>
            <div class="warning" v-show="warning">
                {{warningText}}
            </div>
        </transition>
        <span v-if="undefined != opts.icon" class="input-group-addon"><i :class="['fa', 'fa-'+opts.icon]"></i></span>
        <input v-if="opts.disabled" disabled @blur="blur" @keyup="keyup" @keydown="keydown" @focus="selectAll" :value="value" @input="input" class="form-control" :placeholder="opts.placeholder" :type="opts.type">
        <input v-else @blur="blur" @keyup="keyup" @keydown="keydown" @focus="selectAll" :value="value" @input="input" class="form-control" :placeholder="opts.placeholder" :type="opts.type">
    </div>
</template>
<script>
export default {
    name: 'input',

    props: {
        opts: {
            type: Object
        },

        value: {

        }
    },

    data() {
        return {
            warningText: '',
            warning: false
        };
    },

    methods: {
        _validate() {
            if (undefined != this.opts.validate) {
                if (this.opts.validate.require) {
                    if ('' == this.value) {
                        this.warning = true;
                        this.warningText = '必填项';
                    } else {
                        this.warning = false;
                    }
                }
            }
        },

        input(e) {
            this.$emit('input', e.target.value);
        },

        selectAll(e) {
            e.target.select();
        },

        blur(e) {
            this._validate();
            this.$emit('blur', e);
        },

        keyup(e) {
            this._validate();
            this.$emit('keyup', e);
        },

        keydown(e) {
            this._validate();
            this.$emit('keydown', e);
        }
    }
}
</script>
<style scoped lang="scss">
.com-input {
    position: relative;
    .warning {
        font-size: 12px;
        padding: 5px 15px;
        border-radius: 4px;
        color: #fff;
        background: rgba(#000, .6);
        box-shadow: 1px 2px 3px rgba(#000, .1);
        position: absolute;
        bottom: 35px;
        right: 0;
    }
    .text-danger {
        margin-left: 5px;
        font-size: 12px;
        visibility: hidden;
    }
}
</style>
