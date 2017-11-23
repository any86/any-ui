<template>
    <v-mask :is-show="isShow" :portal="isPortal" @update:isShow="closeMask" @after-leave="afterMaskLeave">
        <transition :name="'slide-' + from" @after-leave="afterDialogLeave">
            <div v-show="isShow" :class="['atom-popup', 'atom-popup--'+from]">
                <header class="atom-popup__header" v-if="undefined != $slots.header">
                    <slot name="header"></slot>
                </header>
                <main class="atom-popup__body">
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
import VMask from '@/packages/Mask/Mask';
export default {
    name: 'Popup',

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
            default: 'down' // or up
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
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-popup {
    position: absolute;
    width: 100%;
    background: $background;
    &--down {
        bottom: 0;
        left: 0;
    }

    &--up {
        top: 0;
        left: 0;
    }
    &__header {
        box-sizing: border-box;
        padding: $gutter;
    }
    &__body {
        overflow-x: hidden;
        overflow-y: auto;
        max-height: 61.8vh;
    }
    &__footer {
        box-sizing: border-box;
    }
}

/*
* 动画
*/
// 上方下滑
.slide-up-enter-active {
    animation: slide-up-in $duration;
}

.slide-up-leave-active {
    animation: slide-up-out $duration;
}

@keyframes slide-up-in {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-up-out {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-100%);
    }
}

// 下方上滑
.slide-down-enter-active {
    animation: slide-down-in $duration;
}

.slide-down-leave-active {
    animation: slide-down-out $duration;
}

@keyframes slide-down-in {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-down-out {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(100%);
    }
}
</style>
