<template>
    <a-mask :isShow="isShow" :portal="portal" @update:isShow="close">
        <transition name="zoom">
            <div v-show="isShow" :class="['atom-dialog-' + align]" class="atom-dialog">
                <header v-if="this.$slots.header">
                    <slot name="header"></slot>
                </header>

                <main class="atom-dialog__body">
                    <slot></slot>
                </main>

                <footer>
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
        }
    },

    components: {
        AMask
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-dialog {
    position: absolute;
    overflow: hidden;
    right: 0;
    left: 0;
    margin: auto;
    width: 90%;
    max-width: 400px;
    border-radius: 4px;
    background: rgba($background,1);
    box-shadow: 1px 2px 15px rgba(0,0,0,0.1);
    &-top {
        top: 20%;
    }
    &-bottom {
        bottom: 12%;
    }
    > header {
        padding: $gutter/2 $gutter 0 $gutter;
        overflow: hidden;
        font-size: $big;
    }
    &__body {
        padding: $gutter;
        overflow-x: hidden;
        overflow-y: auto;
        max-height: 61.8vh;
        min-height:80px;
    }
}

.button-close {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    position: absolute;
    right: 0;
    left: 0;
    bottom: $gutter *3;
    margin: auto;
    border: 1px solid $lightest;
    border-radius: 100%;
}
</style>
