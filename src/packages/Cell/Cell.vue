<template>
    <!-- 当连接用 -->
    <router-link v-if="undefined != to" v-on="$listeners" :to="to" tag="div" class="component-cell" :class="{'component-cell-border': border}">
        <span>
            <slot></slot>
        </span>
        <Icon v-if="hasArrow" class="icon" value="more" :style="{transform: `rotate(${arrowAngle}deg)`}"></Icon>
    </router-link>

    <!-- 一般情况 -->
    <div v-else v-on="$listeners" class="component-cell" :class="{'component-cell-border': border}">
        <span>
            <slot></slot>
        </span>
        <Icon v-if="hasArrow" class="icon" value="more" :style="{transform: `rotate(${arrowAngle}deg)`}"></Icon>
    </div>
</template>
<script>
export default {
    name: 'Cell',

    props: {
        to: {
            type: Object
        },

        hasArrow: {
            type: Boolean,
            default: false
        },

        arrowAngle: {
            default: 0
        },

        border: {
            type: Boolean,
            default: true
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-cell {
    display: flex;
    background: $background;
    padding: 0 $gutter;
    min-height: 1.2rem;
    >span {
        flex: 1;
        position: relative;
        align-self: center; // font-size: $big;
        color: $darkest; // margin-right: $gutter;
    }
    >.icon {
        align-self: center;
        font-size: $biggest;
    }

    &-border {
        border-bottom: 1px solid $lightest;
    }
}
</style>
