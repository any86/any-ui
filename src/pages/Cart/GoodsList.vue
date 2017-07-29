<template>
  <section class="row-goods-list">
    <transition-group v-if="-1 != $store.state.cart.status" name="list-complete" tag="main">
      <section v-for="(goods, i) in $store.state.cart.goodsList" :key="goods.item_id" class="goods">
        <!-- <VCheckbox class="checkbox"></VCheckbox> -->
        <VLazyLoad class="img" :src="goods.image" :watch="scrollY"></VLazyLoad>
        <main class="info">
          <!-- 标题 & 删除按钮-->
          <div class="row-1">
            <a class="title">{{goods.name}}</a>
            <img @click="removeGoods(goods.item_id)" class="icon-remove" src="../../assets/close.svg">
          </div>
          <div class="row-2"></div>
          <!-- 其他信息 -->
          <div class="row-3">
            <!-- <p class="info">{{goods.info}}</p> -->
            <div class="price">
              <span>{{goods.calculation_price}}</span>
              <span>{{goods.info}}</span>
            </div>
            <VStepper class="steppr" v-model="goods.qty" @change="inputCount(i)"></VStepper>
          </div>
        </main>
      </section>
    </transition-group>
    <VSpinner v-else class="spinner"></VSpinner>
  </section>
</template>
<script>
import {SET_CART_STATUS} from '../../store/mutation-types.js'
import VStepper from '@/packages/Stepper/Stepper'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VCheckbox from '@/packages/Checkbox/Checkbox'
import VSpinner from '@/packages/Spinner/Spinner'
export default {
  name: 'GoodsList',

  props: {
    scrollY: {
      required: true
    }
  },

  data() {
    return {
      goodsList: []
    };
  },

  created() {
    // 获取购物车商品列表
    this.$store.dispatch('getGoodsListOfCart').then(response=> {
        this.$store.commit(SET_CART_STATUS, SUCCESS_CODE);
    });
  },

  methods: {
    inputCount(index) {
      this.$prompt('数量', {
        value: this.goodsList[index].count
      }).then(input => {
        this.goodsList[index].count = input;
      }).catch(e => {

      });
    },

    removeGoods(id) {
      this.$confirm('是否删除').then(response => {
        // this.$store.commit('REMOVE_GOODS_FROM_CART', id);
        this.$store.dispatch('removeGoodsFromCart', [id]).then(response=>{
          this.$store.dispatch('getGoodsListOfCart')
        });
      }).catch(e => {

      });
    }
  },

  watch: {
    goodsAppend() {

    }
  },

  components: {
    VLazyLoad,
    VCheckbox,
    VStepper, VSpinner
  }
}

</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$headerHeight: .88rem;
.row-goods-list {
  background: $background;
  >main {
    section {
      display: flex;
      min-width: 0;
      padding: 2*$gutter;
      transition: all .5s;
      border-bottom: 1px solid $lightest;
      &:nth-last-child {
        border-bottom: none;
      }
      .checkbox {
        align-self: center;
        margin-right: 2*$gutter;
      }
      .img {
        align-self: center;
        display: block;
        width: 1.8rem;
        height: 1.8rem;
        margin-right: 2*$gutter;
      }
      .info {
        flex: 1;
        min-width: 0;
        align-self: center;
        .row-1 {
          height: .8rem;
          display: flex;
          .title {
            flex: 1;
            min-width: 0;
            font-size: $big;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .icon-remove {
            margin-top: -.1rem;
            width: .4rem;
            height: .4rem;
          }
        }

        .row-2 {
          height: .5rem;
        }
        .row-3 {
          display: flex;
          height: .5rem;
          width: 100%;
          margin-top: .1rem;
          .info {
            font-size: $big;
            color: $light;
            flex: 1;
            line-height: .5rem;
          }
          .price {
            flex: 1;
            display: block;
            span {
              padding-right: $gutter;
              font-size: $big;
              &:nth-child(1) {
                text-decoration: line-through;
                color: $dark;
              }
            }
          }
          .steppr {}
        }
      }
    }
  }
  .spinner{padding: 3*$gutter 0;}
}

.list-complete-enter,
.list-complete-leave-active {
  overflow: hidden;
  opacity: 0;
  transform: translateY(-30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>
