<template>
    <div class="component-nonius runway">
        <div class="nonius"></div>
    </div>
</template>
<script>
export default {
    name: 'Nonius',

    props: {
        width: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            
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
    &.absolute{position: absolute;right: 0;top:0;}
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
    padding: $gutter / 8 2 * $gutter;
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
