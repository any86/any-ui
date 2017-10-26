<template>
    <!-- 当连接用 -->
    <router-link v-if="undefined != to" v-on="$listeners" :to="to" tag="div" class="atom-cell" :class="{'atom-cell-border': border}">
        <span class="atom-cell__body">
            <slot></slot>
        </span>

        <span v-if="undefined !== $slots.extra" class="atom-cell__extra">
            <slot name="extra"></slot>
        </span>

        <i v-if="undefined !== arrow" class="atom-cell__arrow" value="more" :style="{transform: `rotate(${arrow}deg)`}"></i>
    </router-link>

    <!-- 一般情况 -->
    <div v-else v-on="$listeners" class="atom-cell" :class="{'atom-cell-border': border}">
        <span class="atom-cell__body">
            <slot></slot>
        </span>

        <span v-if="undefined !== $slots.extra" class="atom-cell__extra">
            <slot name="extra"></slot>
        </span>

        <i v-if="undefined !== arrow" class="atom-cell__arrow" value="more" :style="{transform: `rotate(${arrow}deg)`}"></i>
    </div>
</template>
<script>
export default {
    name: 'Cell',

    props: {
        to: {
            type: Object
        },

        arrow: {
            type: Number
        },

        border: {
            type: Boolean,
            default: true
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
    }
    &__extra{
        flex:1;
        position: relative;
        align-self: center;
        text-align: right;
        color: $darkest;
    }

    &__arrow {
        align-self: center;
        background: url(../../assets/more.svg) center center;
        background-size: 100%;
        width: 30px;
        height: 30px;
        display: inline-block;
        transition: transform 200ms;
    }
    &-border {
        border-bottom: 1px solid $lightest;
    }

    .has-ripple {
        position: relative;
        overflow: hidden;
        -webkit-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    .ripple {
        display: block;
        position: absolute;
        pointer-events: none;
        border-radius: 50%;

        -webkit-transform: scale(0);
        -o-transform: scale(0);
        transform: scale(0);

        background: #fff;
        opacity: 1;
    }
    .ripple-animate {
        -webkit-animation: ripple;
        -o-animation: ripple;
        animation: ripple;
    }
    @-webkit-keyframes ripple {
        100% {
            opacity: 0;
            -webkit-transform: scale(2);
            transform: scale(2);
        }
    }
    @-o-keyframes ripple {
        100% {
            opacity: 0;
            -o-transform: scale(2);
            transform: scale(2);
        }
    }
    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2);
        }
    }
}
</style>
