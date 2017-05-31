<template>
    <v-mask v-model="mask.show">
        <v-alert v-model="alert.show" :holdTime="alert.holdTime" :text="alert.text" @ok="alert.ok" @after-leave="alert.afterLeave" class="center">
        </v-alert>
        <v-confirm v-model="confirm.show" :holdTime="alert.holdTime" :text="confirm.text" @ok="confirm.ok" @cancel="confirm.cancel" @after-leave="confirm.afterLeave" class="center">
        </v-confirm>
        <v-prompt :show.sync="prompt.show" :text="prompt.text" v-model="prompt.value" @ok="prompt.ok" @cancel="prompt.cancel" @after-leave="prompt.afterLeave" class="center"></v-prompt>
    </v-mask>
</template>
<script>
import VMask from './Mask'
import VAlert from './Alert'
import VConfirm from './Confirm'
import VPrompt from './Prompt'


export default {
    name: 'Dialog',

    props: {
        value: {}
    },

    data() {
        return {
            mask: {
                show: false
            },
            alert: {
                ok() {},
                afterLeave() {}
            },
            confirm: {
                ok: () => {},
                cancel: ()=> {},
                afterLeave() {}
            },
            prompt: {
                value: '123',
                show: false,
                ok(){},
                cancel(){},
                afterLeave() {}
            }
        };
    },

    watch: {
        ['mask.show'](value) {
            if (!value) {
                this.alert.show = false;
                this.confirm.show = false;
            }
        },

        ['alert.show'](value) {
            if (!value) {
                this.mask.show = false;
            }
        },

        ['confirm.show'](value) {
            if (!value) {
                this.mask.show = false;
            }
        },

        ['prompt.show'](value) {
            if (!value) {
                this.mask.show = false;
            }
        }
    },

    components: {
        VAlert,
        VConfirm,
        VMask,
        VPrompt
    }
}
</script>
<style scoped lang=scss>
.center {
    position: absolute;
    z-index: 1986;
    top: 15%;
    left: 0;
    right: 0;
    margin: auto;
}

.v-alert {}
</style>
