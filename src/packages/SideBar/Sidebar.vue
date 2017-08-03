<template>
    <div class="component-side-bar">
        <VMask v-model="isShow"></VMask>
        <transition>
            <main v-show="isShow" class="side-bar">
                <slot></slot>
            </main>
        </transition>
    </div>
</template>
<script>
import VMask from '@/packages/Dialog/Mask'

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
main.side-bar {
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: $shadowDown;
    z-index: $sideBarZIndex;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 80%;
    background: $background;
    transform: none;
}

.v-enter-active {
    animation: in .3s;
}

.v-leave-active {
    animation: out .3s;
}

@keyframes in {
    0% {
        transform: translate3d(-100%, 0, 0);
    }
    100% {
        transform: none;
    }
}

@keyframes out {
    0% {
        transform: none;
    }
    100% {
        transform: translate3d(-100%, 0, 0);
    }
}
</style>
