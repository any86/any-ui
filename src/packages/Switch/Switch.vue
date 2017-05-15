<template>
    <div class="component-switch">
        <label>
            <input :checked="value" @change="change" type="checkbox">
            <div class="checkbox"></div>
        </label>
    </div>
</template>
<script>
export default {
    name: 'Switch',

    props: {
        value: {
            type: Boolean
        }
    },

    methods: {
        change(e) {
            this.$emit('input', e.target.checked);
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$size: .5rem;
.component-switch {
    label {
        position: relative;
        display: inline-block;
        height: $size;
        width: 1.8 * $size;
        border-radius: $size;
        border: 1px solid $lightest;
        input {
            display: none;
        }
        .checkbox {
            border-radius: $size;
            width: 100%;
            height: 100%;
            transition: all .5s ease;
            background: $success;
            // 圆
            &:before {
                content: " ";
                display: block;
                position: absolute;
                z-index: 2;
                top: 0;
                left: 0;
                height: $size;
                width: $size;
                border-radius: $size;
                transition: all .3s ease;
                background: #fff;
                box-shadow: $shadowDown;
            }
            &:after {
                content: " ";
                display: block;
                position: absolute;
                z-index: 1;
                top: 0;
                right: 0;
                height: $size;
                width: 1.8 * $size;
                border-radius: $size;
                transition: all .3s ease;
                transform: scale(1);
                background: #fff;
            }
        }
        input:checked+.checkbox:before {
            transform: translateX($size * 0.8);
        }
        input:checked+.checkbox:after {
            transform: scale(0);
        }
    }
}
</style>
