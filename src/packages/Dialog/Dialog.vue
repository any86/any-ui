<template>
    <transition name="dialog" @after-leave="afterLeave">
        <div v-show="value" class="component-dialog">
            <div class="header">
                <span><slot name="header"></slot></span>
                <v-close-button class="btn-close" @click.native="close"></v-close-button>
            </div>
    
            <div class="body" :style="{maxHeight: windowHeight * 0.618 + 'px'}">
                <slot></slot>
            </div>
    
            <div class="footer">
                <slot name="footer"></slot>
            </div>
    
        </div>
    </transition>
</template>
<script>
import VCloseButton from './CloseButton'
export default {
    name: 'Dialog',

    data() {
        return {
            dialog: {
                show: false
            },
            windowHeight: 0
        };
    },

    created() {
        this.windowHeight = window.outerHeight;
    },

    props: {
        value: {
            type: Boolean
        }
    },

    methods: {
        close() {
            this.$emit('input', false);
        },

        afterLeave() {
            this.$emit('after-leave');
        }
    },

    components: {
        VCloseButton
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-dialog {
    margin: 15% auto;
    max-width: 640px;
    width: 90%;
    border-radius: 4px;
    background: $background;
    .header {
        padding: $gutter $gutter 0 $gutter;
        overflow: hidden;
        display: flex;
        span{flex:1;}
        .btn-close {
            // align-self: center;
        }
    }
    .body {
        padding: 0 $gutter;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .footer {
        padding: $gutter;
    }
}



/*动画*/

.dialog-enter-active {
    animation: dialog-in .5s;
}

.dialog-leave-active {
    animation: dialog-out .5s;
}

@keyframes dialog-in {
    0% {
        opacity: 0;
        transform: translateY(15px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes dialog-out {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(15px);
    }
}
</style>
