<template>
    <div class="page-my">
        <VCarousel style="width:200px;margin:auto;" v-model="index">
            <VCarouselItem v-for="n in 3" :key="n">
                <p class="page">{{n-1}}</p>
            </VCarouselItem>
        </VCarousel>
        <VInput v-model="index"></VInput>
    </div>
</template>
<script>
import VCarousel from '@/packages/Carousel/Carousel'
import VCarouselItem from '@/packages/Carousel/CarouselItem'
import VInput from '@/packages/Input/Input'

export default {
    name: 'My',

    mounted() {

    },

    data() {
        return {
            index : 0,
        }
    },

    methods: {

    },

    components: {
        VCarousel,
        VCarouselItem,
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
