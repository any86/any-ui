<template>
    <VMask :isShow="isShow" @update:isShow="close">
        <transition name="fadeUp">
            <div v-show="isShow" class="component-dialog">
                <header>
                    <slot name="header"></slot>
                </header>

                <main :style="{maxHeight: windowHeight * 0.618 + 'px'}">
                    <slot></slot>
                </main>

                <footer>
                    <slot name="footer"></slot>
                    <div v-if="hasClose" @click="close" class="button-close">close</div>
                </footer>
            </div>
        </transition>
    </VMask>
</template>
<script>
import VMask from './Mask'
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
            this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        },

        close() {
            this.$emit('update:isShow', false);
        },
    },

    components: {
        VMask
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
    bottom: 20%;
    right: 0;
    left: 0;
    margin: auto;
    overflow: hidden;
    width: 90%;
    max-width: 640px;
    border-radius: 4px;
    background: $background;
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

    >footer {
        .button-close {
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            border-top: 1px solid $lightest;
        }
    }
}
</style>
