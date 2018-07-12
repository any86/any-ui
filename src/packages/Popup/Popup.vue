<template>
    <a-mask :is-show="isShow" :portal="isPortal" @update:isShow="closeMask" @after-leave="afterMaskLeave">
        <transition :name="'slide-from-' + from" @after-leave="afterDialogLeave">
            <div v-show="isShow" :style="{width: -1 === ['top', 'bottom'].indexOf(from) ? width : '100%'}" :class="['atom-popup', 'atom-popup--from-'+from]">
                <header class="atom-popup__header text-center pos-r font-big" v-if="hasClose || undefined != $slots.header">
                    <a-icon v-if="hasClose" name="close" size="24" :class="[`header__icon-close`]"/>
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
    </a-mask>
</template>
<script>
import AMask from '../../packages/Mask';
import AIcon from '../../packages/Icon';
export default {
    name: 'AtomPopup',

    components: {
        AMask,AIcon
    },

    props: {
        // 是否顶部有关闭按钮
        hasClose: {
            type: Boolean,
            default: false
        },

        isShow: {
            type: Boolean,
            defalut: false,
        },

        isPortal: {
            type: Boolean,
            default: false,
        },

        from: {
            type: String,
            default: 'bottom', // or top
        },

        width: {
            type: String,
            default: '80%',
        },
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
        },
    },
};
</script>