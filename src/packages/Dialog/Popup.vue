<template>
    <v-mask :isShow="value" :isFixed="isFixed" @update:isShow="closeMask" @after-leave="afterLeave">
        <transition :name="'dialog-' + from" @after-leave="afterDialogLeave">
            <div v-show="value" :class="['component-dialog', from]" :style="{maxHeight: height * 0.5 + 'px'}">
                <div class="header" v-if="undefined != $slots.header">
                    <slot name="header"></slot>
                </div>
                <div class="body" :style="{maxHeight: height * 0.8 + 'px'}">
                    <slot></slot>
                </div>
                <div class="footer" v-if="undefined != $slots.footer">
                    <slot name="footer"></slot>
                </div>

            </div>
        </transition>
    </v-mask>
</template>
<script>
import VMask from '@/packages/Dialog/Mask'
import { getHeight } from '@/utils/dom'
export default {
    name: 'Popup',

    props: {
        value: {
            type: Boolean
        },

        isFixed: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            from: 'down', // or up
            height: 0
        };
    },

    created() {
        this.height = getHeight(window);
        // 为了兼容vue < 2.4.4
        if (undefined !== this.$attrs) {
            if (undefined !== this.$attrs.from) {
                this.from = this.$attrs.from;
            }
        }
    },

    methods: {
        closeMask() {
            this.$emit('input', false);
        },

        afterDialogLeave() {
            this.$emit('after-dialog-leave');
        },

        afterLeave() {
            this.$emit('after-leave');
        }

    },
    components: {
        VMask
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-dialog {
    position: absolute;
    width: 100%;
    background: $background;
    &.down {

        bottom: 0;
        left: 0;
    }

    &.up {
        top: 0;
        left: 0;
    }
    .header {
        box-sizing: border-box;
        padding: $gutter; // border-bottom: 1px solid $lightest
    }
    .body {
        overflow-x: hidden;
        overflow-y: auto;
    }
    .footer {
        box-sizing: border-box;
    }
}




/*
* 动画
*/

// 上方下滑
.dialog-up-enter-active {
    animation: dialog-up-in .3s;
}

.dialog-up-leave-active {
    animation: dialog-up-out .3s;
}

@keyframes dialog-up-in {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes dialog-up-out {
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
.dialog-down-enter-active {
    animation: dialog-down-in .3s;
}

.dialog-down-leave-active {
    animation: dialog-down-out .3s;
}

@keyframes dialog-down-in {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes dialog-down-out {
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
