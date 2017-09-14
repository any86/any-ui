<template>
    <VMask :isShow="isShow" @update:isShow="close">
        <transition name="fadeUp">
            <div v-show="isShow" class="component-dialog">
                <div class="header">
                    <slot name="header"></slot>
                </div>

                <div class="body" :style="{maxHeight: windowHeight * 0.618 + 'px'}">
                    <slot></slot>
                </div>

                <div class="footer">
                    <slot name="footer"></slot>
                    <div v-if="hasClose" @click="close" class="button-close">close</div>
                </div>
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
            this.windowHeight = window.outerHeight;
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
    margin: 15% auto;
    overflow: hidden;
    max-width: 640px;
    width: 80%;
    border-radius: 4px;
    background: $background;
    .header {
        padding: $gutter/2 $gutter 0 $gutter;
        overflow: hidden;
    }
    .body {
        padding: $gutter;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .footer {
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
