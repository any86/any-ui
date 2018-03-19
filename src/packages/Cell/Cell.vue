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
            v-if="undefined !== direction" 
            value="arrow" 
            size="18" 
            :class="[`atom-cell__arrow--${direction}`]" 
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
            type: String,
        },

        direction: {
            type: String,
            default: 'right'
        },

        hasRipple: {
            default: false
        }
    },

    computed: {
        rippleConfig() {
            return undefined === this.arrow
                ? { isDisabled: !this.hasRipple }
                : { background: '#ccc', isDisabled: !this.hasRipple };
        }
    },

    components: { AIcon }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-cell {
    direction: rtl;
    position: relative;
    display: flex;
    padding: 0 $gutter;
    min-height: 1rem;
    background: $background;
    font-size: $big;
    border-bottom: 1px solid $lightest;
    &__title {
        font-size: inherit;
        align-self: center;
        min-width: 84px;
        margin-right: $gutter/2;
    }

    &__body {
        display: block;
        flex: 1;
        position: relative;
        height: 100%;
        align-self: center;
        font-size: inherit;
    }

    &__extra {
        font-size: inherit;
        position: relative;
        align-self: center;
        text-align: right;
    }

    &__arrow {
        align-self: center;
        background-size: 100%;
        width: 24px;
        height: 24px;
        display: inline-block;
        transition: transform $duration;

        $directions: (
            right: 0deg,
            down: 90deg,
            left: 180deg,
            up: 270deg
        );

        @each $key, $value in $directions {
            &--#{$key} {
                transform: rotate($value);
            }
        }
    }
}
</style>
