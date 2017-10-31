<template>
    <a v-ripple="{disabled: !hasRipple}" v-on="$listeners" v-bind="$attrs" :class="{'atom-cell-border': border}" @click="clickHandler" class="atom-cell">
        <span :style="[bodyStyle, {textAlign}]" class="atom-cell__body">
            <slot></slot>
        </span>

        <span v-if="undefined !== $slots.extra" class="atom-cell__extra">
            <slot name="extra"></slot>
        </span>

        <i v-if="undefined !== arrow" class="atom-cell__arrow" value="more" :style="{transform: `rotate(${arrow}deg)`}"></i>
    </a>
</template>
<script>
export default {
    name: 'Cell',

    props: {
        bodyStyle: {
            type: String,
            default: ()=> {}
        },

        textAlign: {
            type: String,
            default: 'left'
        },

        to: {
            type: Object
        },

        arrow: {
            type: Number
        },

        border: {
            type: Boolean,
            default: true
        },

        hasRipple: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        clickHandler() {
            if (undefined !== this.to) {
                this.$router.push(this.to);
            }
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-cell {
    display: flex;
    padding: 0 $gutter;
    min-height: 1rem;
    &__body {
        flex: 1;
        position: relative;
        align-self: center;
        color: $darkest;
        &--as-button{
            font-size: $big;
            text-align: center;
        }
    }
    &__extra {
        flex: 1;
        position: relative;
        align-self: center;
        text-align: right;
        color: $darkest;
    }

    &__arrow {
        align-self: center;
        background: url(../../assets/more.svg) center center;
        background-size: 100%;
        width: 24px;
        height: 24px;
        display: inline-block;
        transition: transform $duration;
    }
    &-border {
        border-bottom: 1px solid $lightest;
    }
}
</style>
