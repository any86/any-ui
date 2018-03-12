<template>
    <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
        <div 
            v-show="isShow" 
            v-dom-portal="portal" 
            @click.self="close" 
            :style="{position}" 
            v-on="$listeners" 
            v-bind="$attrs"
            @touchstart="stopPropagation"
            @touchmove="stopPropagation"
            @touchend="stopPropagation"
            class="atom-mask">
            <slot></slot>
            <a-icon v-if="hasClose" value="close" @click="close" class="atom-mask__icon-close"/>
        </div>
    </transition>
</template>
<script>
import AIcon from '../../packages/Icon';
export default {
    name: 'AtomMask',

    props: {
        isStopPropagation: {
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

    methods: {
        stopPropagation(e){
            if(this.isStopPropagation) e.stopPropagation();
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

    components: {AIcon}
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
    background: rgba(0,0,0, 0.618);
    &__icon-close{
        position: absolute;
        z-index: 2;
        left:0;right:0;bottom:$gutter*2;
        margin: auto;
        color: $sub;
        border:1px solid $sub;
        border-radius: 50%;
        padding:$gutter/2;
    }
}
</style>
