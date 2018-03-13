<template>
    <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
        <div 
            v-show="isShow" 
            v-dom-portal="portal" 
            @click.self="close" 
            :style="{position}" 
            v-on="$listeners" 
            v-bind="$attrs"
            class="atom-mask">
            <slot></slot>
            <a-icon v-if="hasClose" value="close" @click="close" class="atom-mask__icon-close"/>
        </div>
    </transition>
</template>
<script>
import Finger from '../../utils/finger.js';
import AIcon from '../../packages/Icon';
export default {
    name: 'AtomMask',

    props: {
        isStopPropagation: {
            type: Boolean,
            default: true
        },

        isPreventDefault: {
            type: Boolean,
            default: true
        },

        portal: {
            type: Boolean,
            default: false
        },

        isShow: {
            type: Boolean
        },

        isLock: {
            type: Boolean,
            default: false
        },

        isFixed: {
            type: Boolean,
            default: true
        },

        hasClose: {
            type: Boolean,
            default: false
        }
    },

    mounted() {
        const finger = new Finger(this.$el, {
            isStopPropagation: true,
            isPreventDefault: true,
            tapMaxTime: 50,
        });
        finger.on('tap', e => {
            this.close();
            log(e);
        });
    },

    methods: {
        stopPropagation(e) {
            if (this.isStopPropagation) e.stopPropagation();
            if (this.isPreventDefault) e.preventDefault();
        },

        afterLeave() {
            this.$emit('after-leave');
        },

        afterEnter() {
            this.$emit('after-enter');
        },

        close() {
            if (!this.isLock) {
                this.$emit('update:isShow', false);
            }
        }
    },

    computed: {
        position() {
            return this.isFixed ? 'fixed' : 'absolute';
        }
    },

    components: { AIcon }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-mask {
    z-index: $maskZIndex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.618);
    &__icon-close {
        position: absolute;
        z-index: 2;
        left: 0;
        right: 0;
        bottom: $gutter*2;
        margin: auto;
        color: $sub;
        border: 1px solid $sub;
        border-radius: 50%;
        padding: $gutter/2;
    }
}
</style>
