<template>
  <section class="row-recommend">
    <header>
      {{dataSource.title}}
    </header>
    <VSwiper v-if="0 < list.length" :options="{slidesPerView: 'auto', spaceBetween: 30}">
      <VSwiperItem v-for="(goods, i) in list" :key="goods.entity_id" class="item">
        <span @click="addToCart(goods)" class="button-add">
          <Icon value="plus"></Icon>
        </span>
        <VLazyLoad class="img" :src="goods.image_small_url" :watch="scrollY"></VLazyLoad>
        <h4 class="title">{{goods.name}}</h4>
        <p class="price">{{goods.final_price_with_tax}}</p>
      </VSwiperItem>
    </VSwiper>
    <VSpinner v-else class="spinner"></VSpinner>
  </section>
</template>
<script>
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VSpinner from '@/packages/Spinner/Spinner'
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
      if (SUCCESS_CODE == response.status) {
        this.list = response.data;
      }
    });
  },

  data() {
    return { list: [] };
  },

  methods: {
    addToCart(goods) {
      const $loading = this.$loading();
      const data = {
        product: goods.entity_id,
        options: {
          1631: "9240"
        }
      };
      this.$store.dispatch('addGoodsToCart', data).then(response => {
        this.$store.dispatch('getGoodsListOfCart').then(() => {
          $loading.close();
        });
      });
    }
  },

  components: {
    VLazyLoad,
    VSpinner,
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
    font-size: $big;
    text-align: center;
    height: $headerHeight;
    line-height: $headerHeight;
    width: 100%;
    overflow: hidden;
    padding: 0 3*$gutter;
  }

  .item {
    position: relative;
    width: 2.6rem;
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
      display: block; // width: 80%;
      width: 1rem;
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
  .spinner {
    padding: 3*$gutter 0;
  }
}
</style>
