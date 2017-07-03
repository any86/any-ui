<template>
    <div class="page-my">
        <VSlider>
            <VSliderItem v-for="n in 5" :key="n">
                <p class="page">{{n}}</p>
            </VSliderItem>
        </VSlider>
    </div>
</template>
<script>
import VSlider from '@/packages/Slider/Slider'
import VSliderItem from '@/packages/Slider/SliderItem'

export default {
    name: 'My',

    mounted() {

    },

    data() {
        return {

        }
    },

    methods: {

    },
    components: {
        VSlider,
        VSliderItem
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-my {
    .page {
        background: $dark;text-align: center; height: 5rem;line-height: 5rem;color: $sub;font-size: 1rem;
    }
}
</style>
