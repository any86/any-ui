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
import Finger from '@/utils/finger';
import AIcon from '@/packages/Icon';
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
            isPreventDefault: false,
            tapMaxTime: 100,
        });
        
        // finger.on('tap', e => {
        //     e.preventDefault();
        //     if(this.$el === e.target) {
        //         this.close();
        //     }
        // });

        // finger.on('pan', e => {
        //     e.preventDefault();
        // });
    },

    methods: {
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