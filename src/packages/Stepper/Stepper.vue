<template>
    <div class="component-stepper">
        <a v-if="!!$slots.default" class="title">
            <slot></slot>
        </a>
        <!-- 禁用 -->
        <span class="control" v-if="disabled">
            <Icon class="button disabled" value="minus"></Icon>
            <span class="content disabled">{{value}}</span>
        <Icon class="button disabled" value="plus"></Icon>
        </span>
        <!-- 非禁用 -->
        <span class="control" v-else>
            <Icon :class="['button', min == value && 'disabled']" value="minus" @click="minus"></Icon>
            <span class="content">{{value}}</span>
        <Icon :class="['button', max == value && 'disabled']" value="plus" @click="plus"></Icon>
        </span>
    </div>
</template>
<script>
import Icon from '@/packages/Icon/Icon'
export default {
    name: 'Stepper',

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        min: {
            type: Number,
            default: 0
        },

        max: {
            type: Number,
            default: 10
        },

        step: {
            type: Number
        },

        value: {
            type: [Number, String],
            required: true
        }
    },

    methods: {
        minus() {
            if (this.min < this.value) {
                this.$emit('input', this.value - 1);
            } else {
                this.$emit('reachMin');
            }

        },

        plus() {
            if (this.max > this.value) {
                this.$emit('input', this.value + 1);
            } else {
                this.$emit('reachMax');
            }
        },
    },

    components: {
        Icon
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
$height: .5rem;
.component-stepper {
    position: relative;
    display: flex;
    width: 100%;
    
    >.title {flex:1;font-size: $big;}

    >.control {
        .button {
            height: $height;
            line-height: $height + 0.05rem;
            width: $height;
            border-radius: $borderRadius;
            border-width: 1px;
            border-style: solid;
            border-color: $darker;
            color: $darker;
            font-size: $bigger;
            text-align: center;
            &.disabled {
                border-color: $disabled;
                color: $disabled;
            }
            &:not(.disabled):active {
                border-color: $base;
                color: $base;
            }
        }
        .content {
            display: inline-block;
            width: $height;
            height: $height;
            line-height: $height;
            color: $darker;
            font-size: $bigger;
            text-align: center;
            position: relative;
            &.disabled {
                color: $disabled;
            }
        }
    }
}
</style>
