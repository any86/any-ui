<template>
    <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
        <div v-show="isShow" v-dom-portal @click.self="close" class="component-mask" :style="{position, background, zIndex}" v-on="$listeners" v-bind="$attrs">
            <slot></slot>
        </div>
    </transition>
</template>
<script>


export default {
    name: 'Mask',

    props: {
        isShow: {
            type: Boolean
        },

        background: {
            type: String,
            default: 'rgba(0,0,0, 0.618)'
        },

        lock: {
            type: Boolean,
            default: false
        },

        zIndex: {
            type: Number
        },

        isFixed: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        afterLeave() {
            this.$emit('after-leave');
        },

        afterEnter() {
            this.$emit('after-enter');
        },

        close() {
            if (!this.lock) {
                this.$emit('update:isShow', false);
            }
        }
    },

    computed: {
        position() {
            return this.isFixed ? 'fixed' : 'absolute';
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-mask {
    z-index: $maskZIndex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
