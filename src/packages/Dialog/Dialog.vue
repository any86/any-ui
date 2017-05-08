<template>
    <transition name="dialog" @after-leave="afterLeave">
        <div v-show="value" class="component-dialog">
            <div class="header">
                <v-close-button class="btn-close" @click.native="close"></v-close-button>
                <slot name="header"></slot>
            </div>
            
            <div class="body" :style="{maxHeight: height * 0.5 + 'px'}">
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
            height: 0
        };
    },

    created() {
        this.height = window.outerHeight;
    },

    props: {
        value: {
            type: Boolean
        }
    },

    methods: {
        close(){
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
.component-dialog {
    margin: 5% auto;
    max-width: 640px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, .2);
    .header{padding:15px 15px 0 15px;overflow: hidden;
        .btn-close{float: right;margin-bottom: 15px;}
    }
    .body {
        padding: 0 5px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .footer{padding: 15px;}
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
