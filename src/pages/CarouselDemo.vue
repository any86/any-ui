<template>
    <v-scroll-view>
        <v-carousel v-model="index">
            <v-carousel-item v-for="n in 3" :key="n">
                <div :class="['carousel-item', 'carousel-item-'+n]">{{n}}</div>
            </v-carousel-item>
        </v-carousel>
    </v-scroll-view>
</template>
<script>
import faker from 'faker'
import VCell from '@/packages/Cell/Cell';
import VSwitch from '@/packages/Switch/Switch';
import VCarousel from '@/packages/Carousel/Carousel';
import VCarouselItem from '@/packages/Carousel/CarouselItem';
import VScrollView from '@/packages/ScrollView/ScrollView';

export default {
    name: 'CarouselDemo',

    data() {
        const image = faker.image.food(400, 240);
        return {
            index: 0,
            imageList: [image+'?id=1', image+'?id=2', image+'?id=3']
        };
    },

    components: {
        VCell,
        VSwitch,
        VCarousel,
        VCarouselItem,
        VScrollView
    }
};
</script>
<style scope lang="scss">
@import '../scss/theme.scss';

.carousel-item{
    height: 200px;
    line-height: 200px;
    color:$sub;
    font-size: $biggest;
    text-align: center;

    &-1{
        background: $dark;
    }
    &-2{
        background: $success;
    }

    &-3{
        background: $info;
    }

    
}
</style>