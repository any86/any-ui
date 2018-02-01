<template>
    <a v-ripple="rippleConfig" v-on="$listeners" v-bind="$attrs" class="atom-cell">
        <span v-if="$slots.title || undefined !== title" class="atom-cell__title">
            <template v-if="undefined !== title">{{title}}</template>    
            <slot v-else name="title"></slot>
        </span>

        <span :style="[bodyStyle, {textAlign}]" class="atom-cell__body">
            <div class="body__content">
                <slot></slot>
            </div>
            <p v-show="$slots.tip" class="body__tip">
                <slot name="tip"></slot>
            </p>
        </span>

        <span v-if="undefined !== $slots.extra || undefined !== extra" class="atom-cell__extra">
            <template v-if="undefined !== extra">{{extra}}</template>    
            <slot v-else name="extra"></slot>
        </span>
        
        <a-icon v-if="undefined !== arrow" value="arrow" size="18" :style="{transform: `rotate(${arrow}deg)`}" class="atom-cell__arrow" />
    </a>
</template>
<script>
import AIcon from '../Icon'
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
            default: 'left'
        },

        arrow: {
            type: Number
        },

        hasRipple: {
            default: true
        }
    },

    computed: {
        rippleConfig() {
            return undefined === this.arrow ? { isDisabled: true } : { background: '#ccc', isDisabled: !this.hasRipple };
        }
    },

    components: {AIcon}
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-cell {
    position: relative;
    display: flex;
    padding: 0 $gutter;
    min-height: 1rem;
    background: $background;
    border-bottom: 1px solid $lightest;
    &__title {
        font-size: $big;
        align-self: center;
        min-width: 1rem;
    }

    &__body {
        display: block;
        flex: 1;
        position: relative;
        height: 100%;
        align-self: center;
        font-size: $big;

        > .body__tip {
            position: absolute;
            left: $gutter;
            color: rgba($danger, 1);
            font-size: $small;
        }
    }

    &__extra {
        font-size: $big;
        position: relative;
        align-self: center;
        text-align: right;
    }

    &__arrow {
        align-self: center;
        // background: url(../../assets/more.svg) center center;
        background-size: 100%;
        width: 24px;
        height: 24px;
        display: inline-block;
        transition: transform $duration;
    }
}
</style>
