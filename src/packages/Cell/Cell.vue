<template>
    <a v-on="$listeners" v-bind="$attrs" class="atom-cell">
        <span v-if="$slots.title || undefined !== title" class="atom-cell__title">
            <template v-if="undefined !== title">{{title}}</template>    
            <slot v-else name="title"></slot>
        </span>

        <span :style="[bodyStyle, {textAlign}]" class="atom-cell__body">
            <slot></slot>
        </span>

        <!-- 追加内容 -->
        <span v-if="undefined !== $slots.extra || undefined !== extra" class="atom-cell__extra">
            <template v-if="undefined !== extra">{{extra}}</template>    
            <slot v-else name="extra"></slot>
        </span>
        
        <!-- 箭头图标 -->
        <a-icon 
            v-if="undefined !== arrowDirection" 
            value="arrow" 
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
        title: {
            type: String
        },

        extra: {
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