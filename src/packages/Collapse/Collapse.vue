<template>
    <div class="component-collapse">
        <header @click="toggle">
            <span class="title">
                <slot name="header"></slot>
            </span>
            <Icon class="icon" value="angle-right"></Icon>
        </header>
        <main v-show="value">
            <slot name="body"></slot>
        </main>
    </div>
</template>
<script>
import Icon from '@/packages/Icon/Icon'
export default {
    name: 'Collapse',

    props: {
        value: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {};
    },

    methods: {
        toggle() {
            this.$emit('input', !this.value);
        }
    },

    components: {
        Icon
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-collapse {
    position: relative;
    >header {
        display: flex;
        padding: 2*$gutter;
        border-bottom: 1px solid $lighter;
        >.title {
            font-size: .12rem;
            line-height: .3rem;
            flex: 1;
        }
    }
    >main {
        border-bottom: 1px solid $lighter;
        line-height: 1.5;
        transition: all 1s;
        height: 100%;
    }
}
</style>
