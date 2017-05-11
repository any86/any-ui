<template>
    <span :class="['component-badge', 'small', type]">
        <slot>1</slot>
    </span>
</template>
<script>
export default {
    name: 'Badge',

    data() {
        return {
            type: 'default'
        };
    },

    mounted() {
        this.type = this.$el.getAttribute('type') || 'default';
        this.size = this.$el.getAttribute('size') || 'default';

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-badge {
    position: relative;
    overflow: hidden;
    border-radius: $gutter*2;
    width: 1rem;
}

.small{padding: 0 $gutter;}
.default{padding: $gutter/4 $gutter;}
.big{padding: $gutter/2 $gutter;}



.default {
    background: $default;
    color: #fff;
}

.success {
    background: $success;
    color: #fff;
}

.warning {
    background: $warning;
    color: #fff;
}

.danger {
    background: $danger;
    color: #fff;
}
</style>
