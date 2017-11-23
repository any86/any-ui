<template>
    <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter" >
        <div v-show="isShow" v-dom-portal="portal" @click.self="close" :style="{position, background}" v-on="$listeners" v-bind="$attrs" class="atom-mask">
            <slot></slot>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Mask',

    props: {
        portal: {
            type: Boolean,
            default: false
        },

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
.atom-mask {
    z-index: $maskZIndex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
