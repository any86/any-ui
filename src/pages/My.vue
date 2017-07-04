<template>
    <div class="page-my">
        <VSlider v-model="index">
            <VSliderItem v-for="n in 5" :key="n">
                <p class="page">{{n}}</p>
            </VSliderItem>
        </VSlider>
        <VInput v-model="index"></VInput>
    </div>
</template>
<script>
import VSlider from '@/packages/Slider/Slider'
import VSliderItem from '@/packages/Slider/SliderItem'
import VInput from '@/packages/Input/Input'

export default {
    name: 'My',

    mounted() {

    },

    data() {
        return {
            index : 1,
        }
    },

    methods: {

    },

    components: {
        VSlider,
        VSliderItem,
        VInput
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-my {
    .page {
        background: $dark;
        text-align: center;
        height: 5rem;
        line-height: 5rem;
        color: $sub;
        font-size: 1rem;
    }
}
</style>
