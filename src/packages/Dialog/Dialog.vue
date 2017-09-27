<template>
    <VMask :isShow="isShow" :portal="true" @update:isShow="close">
        <transition name="fadeUp">
            <div v-show="isShow" :class="['component-dialog-' + align]" class="component-dialog">
                <header>
                    <slot name="header"></slot>
                </header>

                <main :style="{maxHeight: windowHeight * 0.618 + 'px'}">
                    <slot></slot>
                </main>

                <footer>
                    <slot name="footer"></slot>
                </footer>
            </div>
        </transition>
        <v-icon-close v-if="hasClose" @click="close" class="button-close"></v-icon-close>
    </VMask>
</template>
<script>
import VMask from './Mask'
import VIconClose from '@/packages/Icon/Close'
import { getHeight } from '@/packages/Tools/dom'
export default {
    name: 'Dialog',

    props: {
        isShow: {
            type: Boolean
        },

        hasClose: {
            type: Boolean,
            default: true
        },

        align: {
            type: String,
            default: 'top'
        }
    },

    data() {
        return {
            windowHeight: 0
        };
    },

    mounted() {
        this.getWindowHeight();
        window.addEventListener('resize', this.getWindowHeight);
    },

    methods: {
        getWindowHeight() {
            this.windowHeight = getHeight(window);
        },

        close() {
            this.$emit('update:isShow', false);
        },
    },

    components: {
        VMask, VIconClose
    },

    destroyed() {
        window.removeEventListener('resize', this.getWindowHeight);
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-dialog {
    position: absolute;
    right: 0;
    left: 0;
    margin: auto;
    width: 90%;
    max-width: 640px;
    border-radius: 4px;
    background: $background;
    &-top {
        top: 20%;
    }
    &-bottom {
        bottom: 20%;
    }
    >header {
        padding: $gutter/2 $gutter 0 $gutter;
        overflow: hidden;
    }
    >main {
        padding: $gutter;
        overflow-x: hidden;
        overflow-y: auto;
        min-height: 2rem;
    }
}

.button-close {
    display: block;
    width: .8rem;
    height: .8rem;
    position: absolute;
    right: 0;
    left: 0;
    bottom: $gutter *3;
    margin: auto;
    border: 1px solid $light;
    border-radius: 100%;
}
</style>
