<template>
  <section class="row-looks">
    <!-- 头部 -->
    <header>
      <div class="background">
        <p>{{dataSource.text1}}</p>
      </div>
      <div class="foreground">
        <h3 class="title">{{dataSource.title}}</h3>
        <div class="breadcrumb">
          <a v-for="(item, i) in dataSource.content" @click="activeIndex = i" :class="{active: activeIndex == i}">
                {{item.title}}
                <span class="triangle"></span>
            </a>
        </div>
      </div>
    </header>
    <!-- 轮播 -->
    <Swiper class="swiper" v-model="activeIndex" :realIndex.sync="realIndex" :options="swiperOptions">
      <SwiperItem v-for="(contentItem, i) in dataSource.content" :key="i" class="swiper-item">
        <transition-group class="item-img" name="fade" tag="div" @before-enter="beforeEnter" @enter="enter" :css="false">
          <template v-for="item in contentItem.swiper">
            <!-- 图片 -->
            <img class="transition" v-if="undefined != item.src" v-show="i == realIndex" :key="item" :src="item.src" :style="{width: item.width, height: item.height, top: item.top, left: item.left, position: 'absolute'}" :data-delay="item.delay" />
            <!-- 文字 -->
            <h4 class="transition" v-else-if="undefined != item.text" v-show="i == realIndex" :key="item" :style="{top: item.top, left: item.left, position: 'absolute', 'font-size': item.fontSize}" :data-delay="item.delay">{{item.text}}</h4>
          </template>
        </transition-group>
        <ul class="list swiper-no-swiping">
          <li v-if="-1 != contentItem.skus.indexOf(goods.sku)" v-for="goods in goodsList">
            <img :src="goods.image_url" />
          </li>
        </ul>
      </SwiperItem>
    </Swiper>
  </section>
</template>
<script>
import Swiper from '@/packages/Swiper/Swiper'
import SwiperItem from '@/packages/Swiper/SwiperItem'
export default {
  name: 'LooksLayout',

  props: {
    dataSource: {
      required: true
    }
  },

  data() {
    return {
      activeIndex: 0,
      swiperOptions: {
        spaceBetween: 30
      },
      realIndex: 0,
      goodsList: []
    }
  },

  mounted() {
    var skus = [];
    this.dataSource.content.forEach(item => {
      skus.push(...item.skus);
    });

    this.$api.getGoodsListBySku({
      skus,
      '___store': 'default'
    }).then(response => {
      if (200 == response.status) {
        this.goodsList = response.data;
      } else {
        this.$alert('错误');
      }
    });
  },

  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transition = 'all 0s';
    },

    enter(el) {
      setTimeout(() => {
        el.style.opacity = 1;
        el.style.transition = 'all 1s';
      }, el.dataset.delay)
    },
  },

  components: {
    Swiper,
    SwiperItem
  }
}

</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.row-looks {
  overflow: hidden;
  header {
    position: relative;
    height: 1.69rem;
    .background {
      bottom: .45rem;
      left: 0;
      position: absolute;
      z-index: 1;
      width: 100%;
      p {
        text-align: center;
        font-size: .72rem;
        color: #eee;
      }
    }
    .foreground {
      top: 0;
      left: 0;
      position: relative;
      z-index: 2;
      .title {
        margin: .3rem auto;
        text-align: center;
        display: block;
      } // 面包屑
      .breadcrumb {
        text-align: center;
        a {
          position: relative;
          font-size: $big;
          display: inline-block;
          .triangle {
            display: none;
          }
          &.active {
            color: $base;
            .triangle {
              position: absolute;
              left: 0;
              right: 0;
              bottom: -15px;
              margin: auto;
              transform: translateX(-10px);
              display: block;
            }
          }
        }
        a:not(:last-of-type) {
          &:after {
            color: #000;
            content: '/';
            width: 20px;
            text-align: center;
            display: inline-block;
          }
        }
      }
    }
  }
  .swiper {
    background: #fff;
    .swiper-item {
      .item-img {
        position: relative;
        width: 100%;
        height: 6rem; // width: 80%;
      }
      .list {
        display: flex;
        width: 100%;
        li {
          flex: 1 0 50%;
          box-sizing: border-box;
          &:nth-child(2n+1) {
            padding-right: 1.5*$gutter;
          }
          &:nth-child(2n+2) {
            padding-left: 1.5*$gutter;
          }
          img {
            display: block;
            width: 100%;
            background: #f2f8f4;
          }
        }
      }
    }
  }
}

</style>
