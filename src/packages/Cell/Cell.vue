<template>
    <a v-on="$listeners" v-bind="$attrs" class="atom-cell">
        <span v-if="$slots.prepend || undefined !== prepend" class="atom-cell__prepend">
            <template v-if="undefined !== prepend">{{prepend}}</template>    
            <slot v-else name="prepend"></slot>
        </span>

        <span :style="[bodyStyle, {textAlign}]" class="atom-cell__body">
            <slot></slot>
        </span>

        <!-- 追加内容 -->
        <span v-if="undefined !== $slots.append || undefined !== append" class="atom-cell__append">
            <template v-if="undefined !== append">{{append}}</template>    
            <slot v-else name="append"></slot>
        </span>
        
        <!-- 箭头图标 -->
        <a-icon 
            v-if="undefined !== arrowDirection" 
            name="arrow" 
            size="18" 
            :class="[`atom-cell__arrow--${arrowDirectionReal}`]" 
            class="atom-cell__arrow" />
    </a>
</template>
<script>
import AIcon from '../Icon';
export default {
    name: 'AtomCell',

    components: { AIcon },

    props: {
        prepend: {
            type: String,
        },

        append: {
            type: String,
        },

        bodyStyle: {
            type: String,
            default: () => {},
        },

        textAlign: {
            type: String,
        },

        arrowDirection: {
            type: String,
            // default: 'right'
        },

        hasRipple: {
            default: false,
        },
    },

    computed: {
        rippleConfig() {
            return undefined === this.arrow ? { isDisabled: !this.hasRipple } : { background: '#ccc', isDisabled: !this.hasRipple };
        },
    },

    data() {
        return {
            // 自动识别元素的dir属性
            arrowDirectionReal: 'rtl',
        };
    },

    mounted() {
        // 根据元素的dir属性决定箭头方向, 从而兼容ar等语言
        const style = getComputedStyle(this.$el, null);
        const DIRECTION_MAP = {
            up: 'up',
            down: 'down',
            left: 'rtl' === style.direction ? 'right' : 'left',
            right: 'rtl' === style.direction ? 'left' : 'right',
            // undefined: undefined
        };
        this.arrowDirectionReal = DIRECTION_MAP[this.arrowDirection];
    },
};
</script>