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
            :class="[`atom-cell__arrow--${arrowDirection}`]" 
            class="atom-cell__arrow" />
    </a>
</template>
<script>
import AIcon from '../Icon';
export default {
    name: 'AtomCell',

    props: {
        prepend: {
            type: String
        },

        append: {
            type: String
        },

        bodyStyle: {
            type: String,
            default: () => {}
        },

        textAlign: {
            type: String
        },

        arrowDirection: {
            type: String,
            // default: 'right'
        },

        hasRipple: {
            default: false
        }
    },

    computed: {
        rippleConfig() {
            return undefined === this.arrow ? { isDisabled: !this.hasRipple } : { background: '#ccc', isDisabled: !this.hasRipple };
        }
    },

    components: { AIcon }
};
</script>