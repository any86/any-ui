<template>
    <v-mask :is-show="isShow" :portal="isPortal" @update:isShow="closeMask" @after-leave="afterMaskLeave">
        <transition :name="'slide-from-' + from" @after-leave="afterDialogLeave">
            <div v-show="isShow" :style="{width: -1 === ['top', 'bottom'].indexOf(from) ? width : '100%'}" :class="['atom-popup', 'atom-popup--from-'+from]">
                <header class="atom-popup__header" v-if="undefined != $slots.header">
                    <slot name="header"></slot>
                </header>
                <main :class="['atom-popup--from-'+ from +'__body']">
                    <slot></slot>
                </main>
                <footer class="atom-popup__footer" v-if="undefined != $slots.footer">
                    <slot name="footer"></slot>
                </footer>
            </div>
        </transition>
    </v-mask>
</template>
<script>
import VMask from '../../packages/Mask/Mask';
export default {
    name: 'AtomPopup',

    props: {
        isShow: {
            type: Boolean,
            defalut: false
        },

        isPortal: {
            type: Boolean,
            default: false
        },

        from: {
            type: String,
            default: 'bottom' // or top
        },

        width: {
            type: String,
            default: '80%'
        }
    },

    methods: {
        closeMask() {
            this.$emit('update:isShow', false);
        },

        afterDialogLeave() {
            this.$emit('after-dialog-leave');
        },

        afterMaskLeave() {
            this.$emit('after-mask-leave');
        }
    },
    components: {
        VMask
    }
};
</script>