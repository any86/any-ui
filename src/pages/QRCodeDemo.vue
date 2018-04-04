<template>
    <main class="demo-page flex">
        <div class="flex-item--center">
            <a-q-r-code style="width:200px;"/>
            <h3 class="text-darkest text-center">本站二维码</h3>
        </div>
        
    </main>
    
</template>
<script>
import { AQRCode } from '@/packages'

export default {
    name: 'QRCodeDemo',

    components: {
        AQRCode
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
