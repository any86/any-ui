<template>
    <div class="component-side-bar">
        <VMask v-model="isShow"></VMask>
        <transition name="side">
            <div v-show="isShow" class="side-bar">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
import VMask from '../Dialog/Mask';

export default {
    name: 'SideBar',

    props: {
        value: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        closeMask() {
            this.$emit('update:isShowSideBar', false);
        }
    },

    computed: {
        isShow: {
            get() {
                return this.value;
            },

            set(value) {
                this.$emit('input', value);
            }
        }
    },

    components: {
        VMask
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
.side-bar {
    box-shadow: $shadowDown;
    z-index: $sideBarZIndex;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 80%;
    background: $background;
    transform: translateX(0);
}

.side-enter-active {
    animation: side-in .3s;
}

.side-leave-active {
    animation: side-out .3s;
}

@keyframes side-in {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0);
    }
}

@keyframes side-out {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
</style>
