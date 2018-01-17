<template>
    <!-- canvas默认是宽度300, 高度300, 为了避免渲染初期影响父元素的尺寸, 所以初期限制为0 -->
    <canvas width="0" height="0" class="atom-qrcode" />
</template>
<script>
import QRCode from 'qrcode';

export default {
    name: 'AtQRCode',

    props: {
        value: {
            default() {
                return this.$isServer ? '' : window.location.href;
            }
        }
    },

    mounted() {
        if (!this.$isServer) {
            this.renderQRCode(this.value);
        }
    },

    methods: {
        renderQRCode(string) {
            const str = String(string);
            QRCode.toCanvas(
                this.$el,
                str,
                // {
                //     color: {
                //         dark: '#000', // Blue dots
                //         light: '#fff' // Transparent background
                //     }
                // },
                error => {
                    if (error) console.error(error);
                }
            );
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
@import '../../scss/variables.scss';
.atom-qrcode {
    width: 2rem;
    height: 2rem;
}
</style>
