<template>
    <canvas class="atom-qrcode">
    </canvas>
</template>
<script>
import QRCode from 'qrcode';

export default {
    name: 'QRCode',

    props: {
        value: {
            default: window.location.href
        }
    },

    mounted() {
        this.renderQRCode(this.value);
    },

    methods: {
        renderQRCode(string) {
            const str = String(string);
            QRCode.toCanvas(this.$el, str, error => {
                if (error) console.error(error);
            });
        }
    },

    watch: {
        value: {
            // immediate: true, // 这个阶段还没有$el
            handler(value) {
                this.renderQRCode(value);
            }
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-qrcode {
    width: 2rem;
    height: 2rem;
}
</style>
