<template>
    <div class="page-entrance full-screen">
        <LayoutBanner v-model="index"></LayoutBanner>
        <VSlider v-model="index" class="slider">
            <VSliderItem>
                <LayoutLogin></LayoutLogin>
            </VSliderItem>
            <VSliderItem>
                <LayoutSignUp></LayoutSignUp>
            </VSliderItem>
        </VSlider>
    </div>
</template>
<script>
import VSlider from '@/packages/Slider/Slider'
import VSliderItem from '@/packages/Slider/SliderItem'

import LayoutBanner from './Entrance/Banner'
import LayoutLogin from './Entrance/Login'
import LayoutSignUp from './Entrance/SignUp'

export default {
    name: 'Entrance',
    data() {
        return {
            index: 0,
        }
    },
    components: {
        LayoutBanner,
        LayoutLogin,
        LayoutSignUp,
        VSlider,
        VSliderItem
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-entrance {display: flex;flex-direction:column;

    >.slider{flex:1;}
}
</style>
