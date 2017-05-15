<template>
    <transition v-if="animate" name="mask" @after-leave="afterLeave" @after-enter="afterEnter">
        <div v-show="value" @click.self="close" class="component-mask">
            <slot></slot>
        </div>
    </transition>
    <div v-else v-show="value" @click.self="close" class="component-mask">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Modal',

    props: {
        value: {
            type: Boolean
        },

        lock: {
            type: Boolean,
            default: false
        },

        animate: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        afterLeave() {
            this.$emit('after-leave');
        },

        afterEnter() {
            this.$emit('after-enter');
        },

        close() {
            if (!this.lock) {
                this.$emit('input', false);
            }
        }
    }

};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-mask {
    position: fixed;
    background: rgba(#000, .5);
    z-index: $maskZIndex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}


/*动画*/

.mask-enter-active {
    animation: mask-in .5s;
}

.mask-leave-active {
    animation: mask-out .5s;
}

@keyframes mask-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes mask-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
