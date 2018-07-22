<template>
    <a-mask :isShow="isShow" :portal="portal" @update:isShow="close">
        <transition name="zoom">
            <div v-show="isShow" :class="['atom-dialog-' + align]" class="atom-dialog">
                <header 
                    v-if="this.$slots.header"
                    class="atom-dialog__header">
                    <slot name="header"></slot>
                </header>

                <main class="atom-dialog__body">
                    <slot></slot>
                </main>

                <footer 
                    v-if="this.$slots.footer" 
                    class="atom-dialog__footer">
                    <slot name="footer"></slot>
                </footer>
            </div>
        </transition>
    </a-mask>
</template>
<script>
import AMask from '../../packages/Mask/Mask';
export default {
    name: 'AtomDialog',

    props: {
        portal: {
            default: false
        },

        isShow: {
            type: Boolean
        },

        align: {
            type: String,
            default: 'top'
        }
    },

    methods: {
        close() {
            this.$emit('update:isShow', false);
            this.$emit('close');
        }
    },

    components: {
        AMask
    }
};
</script>