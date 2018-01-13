<template>
    <main class="demo-page flex">
        <div class="flex-item--center">
            <v-q-r-code style="width:200px;"/>
            <h3 class="text-darkest text-center">本站二维码</h3>
        </div>
        
    </main>
    
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
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
