<template>
  <section class="page-list">
    <LayoutHeader ref="header"></LayoutHeader>
    <ScrollView ref="scroll" v-model="scrollY" class="scroll-list" @reach-bottom="getMore" :ovh="isPopupShow">
      <img src="https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/namenecklacebannner/namenecklace-banner_01-mobile.jpg" width="100%">
      <!-- 列表和筛选条件 -->
      <div class="content">
        <!-- 筛选条件 -->
        <LayoutFilter :scrollY="scrollY" @change="changFilter" :isShow="isPopupShow"></LayoutFilter>
        <ul class="list">
          <VMask v-model="isPopupShow" :isFixed="false" :zIndex="9" ></VMask>
          <router-link v-for="item in list" class="item" tag="li" :to="{path: 'detail', query: {id: item.entity_id}}" :key="item.id">
            <VLazyLoad class="img" :src="item.image_url" :watch="scrollY"></VLazyLoad>
            <h5 align="center">{{item.title}}</h5>
            <div class="price">
              <span class="final">${{item.final_price_with_tax}}</span>
              <span class="regular">${{item.regular_price_with_tax}}</span>
            </div>
            <a class="button-buy">buy</a>
          </router-link>
        </ul>
        <Spinner v-show="isShowSpinner && !isEnd"></Spinner>
        <p v-if="isEnd" class="empty">there is nothing</p>
      </div>
    </ScrollView>
  </section>
</template>
<script>
import Drawer from '@/packages/Drawer/Drawer'
import VMask from '@/packages/Dialog/Mask'

import VPopup from '@/packages/Dialog/Popup'
import Spinner from '@/packages/Spinner/Spinner.vue'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VList from '@/packages/List/List.vue'
import VListItem from '@/packages/List/ListItem.vue'
import VSwitch from '@/packages/Switch/Switch.vue'
import VRadio from '@/packages/Radio/Radio.vue'

// 公共头尾
import LayoutHeader from './List/Header'
import LayoutFilter from './List/Filter'
import LayoutFooter from '@/components/Footer'


export default {
  name: 'List',

  data() {
    return {
      isShowSide: false,
      isShowSpinner: true,
      ovh: false,
      scrollY: 0,
      swiperHeight: -1,
      filter: {
        offsetTop: -1,
        isFixed: false,
        top: -1,
        height: -1
      },
      header: {
        height: -1,
      },
      isEnd: false,
      isScrollUp: false,
      isScrollDown: false,


      bool: true,
      status: -1,
      isLoading: true,
      popupIndex: -1,
      isPopupShow: false,

      list: [],
      trend: 2,
      page: 1,
      limit: 20,
    };
  },

  mounted() {
    this.refresh();
    this.header.height = this.$refs.header.$el.offsetHeight;
  },

  methods: {
    changFilter() {
      this.isPopupShow = true;

    },
    showPopup(index) {
      this.isShowSpinner = false;
      this.$nextTick(() => {
        this.popupIndex = index;
        this.isPopupShow = true;
      });
      // var style = getComputedStyle(this.$refs.swiper.$el, null);
      // dir(style)
    },

    afterPopupLeave() {
      this.isShowSpinner = true;
    },

    refresh() {
      this.isEnd = false;
      this.list = [];
      const params = {
        page: 1,
        limit: this.limit,
        trend: this.trend
      };
      this.$api.getGoodsList(params).then(response => {
        if (200 == response.status) {
          this.list.push(...response.data);
          this.isLoading = false;
        } else {
          this.isEnd = true;
        }
      });
    },

    getMore() {
      if (!this.isLoading) {
        this.isLoading = true;
        this.page++;
        const params = {
          page: this.page,
          limit: this.limit,
          trend: this.trend
        };
        this.$api.getGoodsList(params).then(response => {
          if (200 == response.status) {
            this.list.push(...response.data);
            this.isLoading = false;
          } else {
            this.isEnd = true;
          }
        });
      }
    }
  },

  watch: {
    trend() {
      this.isPopupShow = false;
      this.refresh();
    },

    scrollY(newValue, oldValue) {
      this.filter.isFixed = this.filter.offsetTop < newValue;
      if (this.filter.isFixed) {
        this.filter.top = this.header.height;
      } else {
        this.filter.top = 0;
      }
      if (newValue >= oldValue) {
        this.isScrollDown = true;
        this.isScrollUp = false;
      } else {
        this.isScrollDown = false;
        this.isScrollUp = true;
      }


    },

    isPopupShow(value) {
      this.ovh = value;
    }
  },

  components: {
    VList,
    VListItem,
    Spinner,
    VLazyLoad,
    VPopup,
    VRadio,
    VSwitch,
    LayoutHeader,
    LayoutFilter,
    LayoutFooter,
    Drawer,
    VMask
  }
}

</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .scroll-list {
    position: relative;

    .content {
      position: relative;
      overflow: hidden;
      .list {
        position: relative;
        margin-top: 1rem;
        display: flex;
        flex-flow: row wrap;
        >.item {
          padding: .01rem;
          flex: 0 0 50%;
          >.img {
            overflow: hidden;
            margin: auto;
            width: 3rem;
            height: 3rem;
          }
          >.img[lazy="loading"] {}
          >.img[lazy="done"] {
            animation: zoomIn 1s;
          }

          .price {
            display: table;
            margin: auto;
            .final {
              padding: .1rem;
            }
            .regular {
              padding: .1rem;
              color: $light;
              text-decoration: line-through;
            }
          }

          .button-buy {
            text-align: center;
            width: 100%;
            height: .8rem;
            line-height: .8rem;
            background: $base;
            color: $sub;
            display: block;
            margin-top: .3rem;
          }
        }
      }
      .spinner {
        // margin: 30px auto;
      }
      .empty {
        text-align: center;
        font-size: .3rem;
        color: $light;
        margin: 30px auto;
      }
    }
  }
  .footer-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}

</style>
