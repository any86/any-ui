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
            <a-icon v-if="hasClose" name="close" @click="close" class="atom-mask__icon-close"/>
        </div>
    </transition>
</template>
<script>
import { getConfig } from '../../packages/config/';
import AIcon from '../../packages/Icon';
export default {
    name: 'AtomMask',

    components: { AIcon },

    props: {
        isStopPropagation: {
            type: Boolean,
            default: true,
        },

        isPreventDefault: {
            type: Boolean,
            default: true,
        },

        portal: {
            type: Boolean,
            default: false,
        },

        isShow: {
            type: Boolean,
            default: false,
        },

        closeable: {
            type: Boolean,
            default: true,
        },

        // 预备删除
        isFixed: {
            type: Boolean,
            default: true,
        },

        hasClose: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        afterLeave() {
            this.$emit('after-leave');
        },

        afterEnter() {
            this.$emit('after-enter');
        },

        close() {
            if (this.closeable) {
                this.$emit('update:isShow', false);
            }
        },
    },

    computed: {
        position() {
            return this.isFixed ? 'fixed' : 'absolute';
        },
    },

    watch: {
        isShow(isShow) {
            if (isShow) {
                document.documentElement.classList.add('ovh');
                getConfig('ON_MASK_SHOW')();
            } else {
                document.documentElement.classList.remove('ovh');
                getConfig('ON_MASK_HIDE')();
            }
        },
    },

    mounted() {
        if (this.isShow) {
            getConfig('ON_MASK_SHOW')();
        }
    },
};
</script>