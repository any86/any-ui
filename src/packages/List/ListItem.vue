<template>
    <li class="component-list-item">
        <main class="body">
            <slot></slot>
        </main>
        <!-- 箭头 -->
        <div v-if="hasArrow" class="arrow">
            <Icon class="icon" value="angle-right"></Icon>
        </div>
    </li>
</template>
<script>
import Icon from '../Icon/Icon';
export default {
    name: 'ListItem',

    props: {
        hasArrow: {
            type: Boolean,
            default: false
        },
    },

    components: {
        Icon
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-list-item {
    position: relative;
    background: $background;
    overflow: hidden;
    border-bottom: 1px solid $lightest;
    >main {
        position: relative;
        flex: 1 0 100%;
        padding: 3*$gutter;
    }
    >.arrow {
        font-size: 3em;
        .icon {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 2*$gutter;
        }
    }
}
</style>
