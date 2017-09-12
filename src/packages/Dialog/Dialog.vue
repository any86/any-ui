<template>
    <VMask :value="value" @input="close">
        <transition name="fadeUp">
            <div v-show="value" class="component-dialog">
                <div class="header">
                    <span>
                        <slot name="header"></slot>
                    </span>
                    <i v-if="hasClose" class="btn-close iconfont icon-close" @click="close"></i>
                </div>

                <div class="body" :style="{maxHeight: windowHeight * 0.618 + 'px'}">
                    <slot></slot>
                </div>

                <div class="footer">
                    <slot name="footer"></slot>
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
        value: {
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
            this.$emit('input', false);
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
    max-width: 640px;
    width: 80%;
    border-radius: 4px;
    background: $background;
    .header {
        padding: $gutter $gutter 0 $gutter;
        overflow: hidden;
        display: flex;
        align-items: center;
        span {
            flex: 1;
        }
        .btn-close {
            align-self: center;
            padding: 4px;
        }
    }
    .body {
        padding: $gutter;
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>
