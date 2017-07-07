<template>
    <label :style="{width: !!this.$slots.default && '100%'}" :class="[disabled && 'disabled']" class="component-checkbox">
        <span v-if="!!this.$slots.default" class="title" :class="{reverse}">
                <slot></slot>
            </span>
        <input v-model="checked" :true-value="trueValue" :false-value="falseValue" type="checkbox">
        <span class="circle"></span>
    </label>
</template>
<script>
export default {
    name: 'Checkbox',

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        'true-value': {
            default: true
        },

        'false-value': {
            default: false
        },

        reverse: {
            type: Boolean,
            default: false
        },

        value: {
            required: false
        }
    },

    data() {
        return {
            checked: false
        };
    },

    mounted() {
        this.checked = this.value;
    },

    watch: {
        value(value) {
            this.checked = value;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: .5rem;
label.component-checkbox {
    display: flex;
    align-items: center;
    overflow: hidden;
    .title {
        flex: 1;
        font-size: $big;
        &.reverse {
            order: 1;
            padding-left: $gutter*2;
        }
    }
    >input {
        display: none;
        opacity: 0;
    }
    >.circle {
        border: 1px solid $light;
        width: $height;
        height: $height;
        background: $sub;
        border-radius: 100%;
        display: flex;
        // justify-content: center;
        // align-items: center;
        &:after {
            content: ' ';
            height: .25*$height;
            width: .5*$height;
            margin: .26*$height auto;
            border-style: solid;
            border-color: $sub;
            border-width: 0 0 2px 2px;
            display: block;
            overflow: hidden;
            transform: rotate(-45deg);
        }
    }
    >input:checked+.circle {
        background: $base;
        border: 1px solid $base;
        &:after {
            animation: zoom-in .5s;
        }
    }
}

@keyframes zoom-in {
    0% {
        opacity: 0;
        transform: scale(1.5) rotate(-45deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(-45deg);
    }
}
</style>
