<template>
    <transition name="fade">
        <div v-if="isShow" :class="['component-toast', position]">
            <div v-if="'default' != type" class="icon">
                <Icon v-if="'success' == type" :key="1" value="check"></Icon>
                <Icon v-else-if="'error' == type" :key="2" value="remove"></Icon>
            </div>
            <p>{{text}}</p>
        </div>
    </transition>
</template>
<script>
import Icon from '@/packages/Icon/Icon'
export default {
    name: 'Toast',

    data() {
        return {
            timer: null,
            text: '',
            isShow: false,
            delay: 200000,
            position: 'center',
            type: 'default'
        };
    },

    mounted() {

    },

    destroyed() { },

    methods: {
        delayClose() {
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
                this.delayClose();
            }
        }
    },

    components: {
        Icon
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
