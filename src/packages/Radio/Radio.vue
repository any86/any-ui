<template>
    <!-- radio改为圆形, 为了区别checkbox-->
    <label :class="['component-radio', disabled && 'component-radio-disabled']">
        <span v-if="!!$slots.default" class="title">
            <slot></slot>
        </span>
        <input :class="{checked: isChecked}" :disabled="disabled" :value="value" :checked="isChecked" @change="change" @click.stop="()=>{}" type="radio">
        <span class="appearance"></span>
    </label>
</template>
<script>
export default {
    name: 'Radio',

    model: {
        prop: 'referenceValue',
        event: 'change'
    },

    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        // 外部参考值
        // checked: referenceValue == value
        referenceValue: {
            required: true
        },

        value: {
            required: true
        }
    },
    methods: {
        change() {
            if (!this.disabled) {
                this.$emit('change', this.value);
            }
        }
    },

    computed: {
        isChecked() {
            return this.value == this.referenceValue;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$size: .5rem;
label.component-radio {
    display: flex;
    align-items: center;
    >.title {
        flex: 1;
        font-size: $normal;
        &.active {
            color: $base;
        }
    }

    >input {
        &+.appearance {
            display: flex;
            border: 1px solid $base;
            width: $size;
            height: $size;
            border-radius: 100%;
            &:after {
                content: ' ';
                display: none;
                animation: zoom-in 500ms;
            }
        }
    }


    >input:checked {
        &+.appearance {
            display: flex;
            border: 1px solid $base;
            width: $size;
            height: $size;
            border-radius: 100%;
            &:after {
                content: ' ';
                align-self: center;
                margin: auto;
                display: block;
                width: $size/2;
                height: $size/2;
                background: $base;
                border-radius: 100%;
            }
        }
    }



    @keyframes zoom-in {
        0% {
            opacity: 0;
            transform: scale(.8);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
}
</style>
