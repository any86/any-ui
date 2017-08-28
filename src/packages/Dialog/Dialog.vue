<template>
    <VMask :value="value" @input="close">
        <transition name="fadeUp" @after-leave="afterLeave">
            <div v-show="value" class="component-dialog">
                <div class="header">
                    <span>
                        <slot name="header"></slot>
                    </span>
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
    </VMask>
</template>
<script>
import VMask from './Mask'
import VCloseButton from './CloseButton'
export default {
    name: 'Dialog',

    props: {
        value: {
            type: Boolean
        }
    },

    data() {
        return {
            windowHeight: 0
        };
    },

    created() {
        this.windowHeight = window.outerHeight;
    },

    mounted(){
        window.addEventListener('resize', ()=>{
            this.windowHeight = window.outerHeight;
        });
    },

    methods: {
        close() {
            this.$emit('input', false);
        },

        afterLeave() {
            this.$emit('input', false);
            this.$emit('after-leave');
        }
    },

    components: {
        VCloseButton, VMask
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
        span {
            flex: 1;
        } // .btn-close {
        //     // align-self: center;
        // }
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
</style>
