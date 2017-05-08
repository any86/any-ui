<template>
    <v-modal v-model="modal.show">
        <v-alert v-model="alert.show" :holdTime="alert.holdTime" :text="alert.text" @ok="alert.ok" @after-leave="alert.afterLeave" class="center">
        </v-alert>
        <v-confirm v-model="confirm.show" :holdTime="alert.holdTime" :text="confirm.text" @ok="confirm.ok" @cancel="confirm.cancel" @after-leave="confirm.afterLeave" class="center">
        </v-confirm>
    </v-modal>
</template>
<script>
import VModal from './Modal'
import VAlert from './Alert'
import VConfirm from './Confirm'

export default {
    name: 'Dialog',

    props: {
        value: {}
    },

    data() {
        return {
            modal: {
                show: false
            },
            alert: {
                ok(){},
                afterLeave(){}
            },
            confirm: {
                ok: () => {},
                cancel(){},
                afterLeave(){}
            },
            prompt: {
                show: false,
                text: '初始值 !',
            }
        };
    },

    watch: {
        ['modal.show'](value) {
            if (!value) {
                this.alert.show = false;
                this.confirm.show = false;
            }
        },

        ['alert.show'](value) {
            if (!value) {
                this.modal.show = false;
            }
        },

        ['confirm.show'](value) {
            if (!value) {
                this.modal.show = false;
            }
        }
    },

    components: {
        VAlert,
        VConfirm,
        VModal
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
