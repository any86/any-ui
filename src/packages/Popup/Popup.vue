<template>
    <v-mask :is-show="isShow" :portal="isPortal" @update:isShow="closeMask" @after-leave="afterMaskLeave">
        <transition :name="'slide-from-' + from" @after-leave="afterDialogLeave">
            <div v-show="isShow" :class="['atom-popup', 'atom-popup--from-'+from]">
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
            default: 'bottom' // or top
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
    &--from-bottom {
        bottom: 0;
        left: 0;
    }

    &--from-top {
        top: 0;
        left: 0;
    }


    &--from-left {
        top: 0;
        left: 0;
        height: 100vh;
        width:80%;
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
.slide-from-top-enter-active {
    animation: slide-from-top-in $duration;
}

.slide-from-top-leave-active {
    animation: slide-from-top-out $duration;
}

@keyframes slide-from-top-in {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-from-top-out {
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
.slide-from-bottom-enter-active {
    animation: slide-from-bottom-in $duration;
}

.slide-from-bottom-leave-active {
    animation: slide-from-bottom-out $duration;
}

@keyframes slide-from-bottom-in {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-from-bottom-out {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(100%);
    }
}


// 左侧
.slide-from-left-enter-active {
    animation: slide-from-left-in $duration;
}

.slide-from-left-leave-active {
    animation: slide-from-left-out $duration;
}

@keyframes slide-from-left-in {
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slide-from-left-out {
    0% {
        opacity: 1;
        transform: translateX(0);
    }
    100% {
        opacity: 0;
        transform: translateX(-100%);
    }
}

</style>
