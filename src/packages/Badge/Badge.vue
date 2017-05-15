<template>
    <span :class="['component-badge', size, type]">
        <slot></slot>
    </span>
</template>
<script>
export default {
    name: 'Badge',

    data() {
        return {
            type: 'default',
            size: 'big'
        };
    },

    mounted() {
        var type = this.$el.getAttribute('type');
        var size = this.$el.getAttribute('size')
        if (null != type) {
            this.type = type;
        }

        if (null != size) {
            this.size = size;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-badge {
    display: inline-block;
    position: relative;
    overflow: hidden;
}

.small {
    width: $gutter*2;
    height: $gutter*2;
    border-radius: 100%;
}

.big {
    padding: $gutter / 6 2 * $gutter;
    border-radius: $gutter*2;
}

.default {
    @include theme('default');
}

.success {
    @include theme('success');
}

.warning {
    @include theme('warning');
}

.danger {
    @include theme('danger');
}

.info {
    @include theme('info');
}
</style>
