<template>
  <section class="row-recommend">
    <header>
      {{dataSource.title}}
    </header>
    <VSwiper v-if="0 < list.length" :options="{slidesPerView: 'auto', spaceBetween: 30}">
      <VSwiperItem v-for="(item, i) in list" :key="i" class="item">
        <span @click="addToCart(item)" class="button-add">
          <Icon value="plus"></Icon>
        </span>
        <VLazyLoad class="img" :src="item.img" :watch="scrollY"></VLazyLoad>
        <h4 class="title">{{item.title}}</h4>
        <p class="price">{{item.price}}</p>
      </VSwiperItem>
    </VSwiper>
  </section>
</template>
<script>
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VSwiper from '@/packages/Swiper/Swiper'
import VSwiperItem from '@/packages/Swiper/SwiperItem'

export default {
  name: 'Recommend',

  props: {
    dataSource: {
      required: true
    },

    scrollY: {
      required: true
    }
  },

  created() {
    this.$api.getCartRecommend().then(response => {
      if (200 == response.status) {
        this.list = response.data;
      }
    });
  },

  data() {
    return { list: [] };
  },

  methods: {
    addToCart(goods) {
      this.$store.dispatch('addGoodsToCart', goods).then(response => {
        this.$toast('ok')
      });
    }
  },

  components: {
    VLazyLoad,
    VSwiper,
    VSwiperItem
  }
}

</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$headerHeight: .88rem;
.row-recommend {
  margin-top: $gutter*3;
  background: $background;
  header {
    font-size: $big;text-align: center;
    height: $headerHeight;
    line-height: $headerHeight;
    width: 100%;
    overflow: hidden;
    padding: 0 3*$gutter;
  }

  .item {
    position: relative;
    width:2.6rem;
    &:last-child {
      border-right: none;
    }
    .button-add {
      position: absolute;
      top: .1rem;
      right: .1rem;
      background: $base;
      height: .5rem;
      line-height: .5rem;
      width: .5rem;
      text-align: center;
      border-radius: 100%;
      color: $sub;
      font-size: $big;
      overflow: hidden;
    }
    .img {
      display: block;
      width: 80%;
      margin: auto;
    }
    .title {
      text-align: center;
      color: $dark;
      min-height: .5rem;
      font-size: $normal;
    }
    .price {
      text-align: center;
      color: $darkest;
      height: .5rem;
      font-size: $normal;
    }
  }
}
</style>
