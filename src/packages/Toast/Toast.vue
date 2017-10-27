<template>
    <VMask v-model="isShow" :background="'rgba(0,0,0,0)'">
        <transition name="fade">
            <div v-if="isShow" :class="['component-toast', position]">
                <p>{{text}}</p>
            </div>
        </transition>
    </VMask>
</template>
<script>
import VMask from '@/packages/Dialog/Mask'

export default {
    name: 'Toast',

    data() {
        return {
            timer: null,
            text: '',
            isShow: false,
            delay: 3000,
            position: 'center',
            type: 'default'
        };
    },

    methods: {
        close() {
            if (-1 != this.delay) {
                this.timer = setTimeout(() => {
                    this.isShow = false;
                }, this.delay);
            }
        }
    },

    watch: {
        isShow(value) {
            if (value) {
                this.close();
            }
        }
    },

    components: {
        VMask
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: $minHeight;
.component-toast {
    position: fixed;
    background: rgba(0, 0, 0, .7);
    color: $sub;
    border-radius: $borderRadius;
    box-shadow: $shadowUp, $shadowDown; // overflow: hidden;
    padding: $gutter 1.2*$gutter; // word-break: keep-all;
    // white-space:nowrap;
    &.top {
        z-index: $toastZIndex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-style: preserve-3d;
    }
    &.center {
        z-index: $toastZIndex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-style: preserve-3d;
    }
    &.bottom {
        z-index: $toastZIndex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-style: preserve-3d;
    }
    .icon {
        width: 2*$height;
        height: 2*$height;
        margin: 0 auto;
        text-align: center;
        i {
            font-size: 1rem;
            line-height: 2*$height;
        }
    }
    >p {
        text-align: center;
        color: $sub;
    }
}

// 动画
.toast-enter-active {
    animation: toast-in .3s;
}

.toast-leave-active {
    animation: toast-out .3s;
}

@keyframes toast-in {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.1);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

@keyframes toast-out {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.1);
    }
}
</style>
