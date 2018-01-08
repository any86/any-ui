<template>
    <VQRCode style="width:200px;" class="gutter-auto gutter-top"/>
</template>
<script>
import VQRCode from '@/packages/QRCode/QRCode';

export default {
    name: 'QRCodeDemo',

    components: {
        VQRCode
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
